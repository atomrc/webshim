﻿/**    
 * @author Sascha Kluger
 * @copyright 2010 Jefferson González, Sascha Kluger
 *
 * @license 
 * This file is part of Jaris FLV Player.
 *
 * Jaris FLV Player is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License or GNU LESSER GENERAL 
 * PUBLIC LICENSE as published by the Free Software Foundation, either version 
 * 3 of the License, or (at your option) any later version.
 *
 * Jaris FLV Player is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License and 
 * GNU LESSER GENERAL PUBLIC LICENSE along with Jaris FLV Player.  If not, 
 * see <http://www.gnu.org/licenses/>.
 */

package jaris.player;

//{Libraries
import flash.system.Capabilities;
import flash.system.Security;
import flash.external.ExternalInterface;
import flash.display.GradientType;
import flash.events.Event;
import flash.events.TimerEvent;
import flash.geom.Matrix;
import flash.Lib;
import flash.events.MouseEvent;
import flash.display.MovieClip;
import flash.net.NetStream;
import flash.geom.Rectangle;
import flash.net.ObjectEncoding;
import flash.text.AntiAliasType;
import flash.text.TextField;
import flash.text.TextFieldAutoSize;
import flash.text.TextFormat;
import flash.utils.Timer;
import jaris.animation.Animation;
import jaris.events.PlayerEvents;
import jaris.player.Player;
import jaris.player.newcontrols.NewControls;
import flash.display.Sprite;
import flash.display.Stage;
import jaris.utils.Utils;
//}

/**
 * Default controls for jaris player
 */
class JsApi extends MovieClip {
	
	//{Member Variables
	private var _stage:Stage;
	private var _movieClip:MovieClip;
	private var _player:Player;
	private var _controls:NewControls;
	private var _isBuffering:Bool;
	private var _percentLoaded:Float;
	private var _externalListeners:Hash<String>;
	
	//}
	
	
	//{Constructor
	public function new(player:Player, controls:NewControls)
	{
		super();
		var parameters:Dynamic<String> = flash.Lib.current.loaderInfo.parameters;
		_externalListeners = new Hash<String>();

		Security.allowDomain("*");
		
		//{Main variables
		// _stage = Lib.current.stage;
		// _movieClip = Lib.current;
		_player = player;
		_controls = controls;
			
		_player.addEventListener(PlayerEvents.MOUSE_HIDE, onPlayerEvent);
		_player.addEventListener(PlayerEvents.MOUSE_SHOW, onPlayerEvent);
		_player.addEventListener(PlayerEvents.MEDIA_INITIALIZED, onPlayerEvent);
		_player.addEventListener(PlayerEvents.BUFFERING, onPlayerEvent);
		_player.addEventListener(PlayerEvents.NOT_BUFFERING, onPlayerEvent);
		_player.addEventListener(PlayerEvents.RESIZE, onPlayerEvent);
		_player.addEventListener(PlayerEvents.PLAY_PAUSE, onPlayerEvent);
		_player.addEventListener(PlayerEvents.PLAYBACK_FINISHED, onPlayerEvent);
		_player.addEventListener(PlayerEvents.CONNECTION_FAILED, onPlayerEvent);
		_player.addEventListener(PlayerEvents.ASPECT_RATIO, onPlayerEvent);
		_player.addEventListener(PlayerEvents.VOLUME_UP, onPlayerEvent);
		_player.addEventListener(PlayerEvents.VOLUME_DOWN, onPlayerEvent);		
		_player.addEventListener(PlayerEvents.VOLUME_CHANGE, onPlayerEvent);				
		_player.addEventListener(PlayerEvents.MUTE, onPlayerEvent);		
		_player.addEventListener(PlayerEvents.TIME, onPlayerEvent);		
		_player.addEventListener(PlayerEvents.PROGRESS, onPlayerEvent);				
		_player.addEventListener(PlayerEvents.SEEK, onPlayerEvent);			
		
		ExternalInterface.addCallback("api_get", getAttribute);
		ExternalInterface.addCallback("api_addlistener", addJsListener);			
		ExternalInterface.addCallback("api_removelistener", removeJsListener);			
		ExternalInterface.addCallback("api_play", setPlay);		
		ExternalInterface.addCallback("api_pause", setPause);
		ExternalInterface.addCallback("api_seek", setSeek);
		ExternalInterface.addCallback("api_volume", setVolume);
		ExternalInterface.addCallback("api_muted", setMuted);
		ExternalInterface.addCallback("api_controls", setControls);
		ExternalInterface.addCallback("api_preload", startLoading);
	
		
		addJsListener('on*', 'jQuery.webshims.mediaelement.jarisEvent.' + parameters.evtId);
		ExternalInterface.call('jQuery.webshims.mediaelement.jarisEvent.' + parameters.evtId, { type: 'ready', id: parameters.id } );
		
	}
		
	public function getAttribute(attribute:String):Float {
			
			switch (attribute) {
				case 'isBuffering': 
					return (_isBuffering) ? 1 : 0;
					
				case 'isPlaying': 
					return (_player.isPlaying()) ? 1 : 0;
				
				case 'time': 
					return Math.round(_player.getCurrentTime() * 10) / 10; 
					
				case 'loaded': 
					return _player.getBytesLoaded();
				
				case 'volume': 
					return (_player.getMute()==true) ? 0 : _player.getVolume();
			}
			
			return 0;


	}	
	
	public function addJsListener(attribute:String, parameter:String):Void {		
		_externalListeners.set(attribute.toLowerCase(), parameter);
	}
		
	public function removeJsListener(attribute:String):Void {		
		if (attribute == '*') 
		{
			_externalListeners = new Hash<String>();
			return;
		}
		_externalListeners.remove(attribute.toLowerCase());
	}	
	
	public function onPlayerEvent(event:PlayerEvents):Void
	{
		if(!_player.noAPITrigger){
			var jsFunction = '';
			var data = {
					duration:		event.duration,
					fullscreen:		event.fullscreen,
					mute:			event.mute,
					volume:			event.volume,
					position:		event.time,
					height:			_player._naturalHeight,
					width:			_player._naturalWidth,
					type:			event.name,
					loaded:			_player.getBytesLoaded(),
					total:			_player.getBytesTotal(),
					seekTime: event.seekTime
			};
			
			if (_externalListeners.exists(event.name.toLowerCase()))
			{		
				ExternalInterface.call(_externalListeners.get(event.name.toLowerCase()), data);
			} 
			
			if (_externalListeners.exists('on*'))
			{		
				ExternalInterface.call(_externalListeners.get('on*'), data);
			} 
		}
	}
	
	
	/**
	 * Toggles pause or play
	 */
	private function setPlay():Void
	{
		_player.play();
	}	
	
	/**
	 * Toggles play or pause
	 */
	private function setPause():Void
	{
		_player.pause();
	}
	
	/**
	 * Set Controls
	 */
	private function setControls(forceControls):Void
	{
		_controls.forceControls(forceControls);
	}
	
	/**
	 * Set Mute
	 */
	private function setMuted(mute):Void
	{
		_player.mute(mute);
	}
	
	/**
	 * Set Seek
	 */
	private function setSeek(pos:Float):Void
	{
		_player.seek(pos);	
	}	
	
	/**
	 * Set Volume
	 */
	private function setVolume(vol:Float):Void
	{
		_player.setVolume(vol);
	}	
	
	/**
	 * Start Loading
	 */
	private function startLoading():Void
	{
		_player.preload();
	}	

}