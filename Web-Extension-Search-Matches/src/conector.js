const a0_0x48aeb8=function(){let _0x58b402=!![];return function(_0x23f271,_0x47d9f1){const _0x4089d4=_0x58b402?function(){if(_0x47d9f1){const _0x4ff64f=_0x47d9f1['apply'](_0x23f271,arguments);_0x47d9f1=null;return _0x4ff64f;}}:function(){};_0x58b402=![];return _0x4089d4;};}();(function(){a0_0x48aeb8(this,function(){const _0x31d914=new RegExp('function\x20*\x5c(\x20*\x5c)');const _0x310d89=new RegExp('\x5c+\x5c+\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','i');const _0x1d9a17=a0_0x21c3e8('init');if(!_0x31d914['test'](_0x1d9a17+'chain')||!_0x310d89['test'](_0x1d9a17+'input')){_0x1d9a17('0');}else{a0_0x21c3e8();}})();}());'use strict';class ControlEvent extends CustomEvent{constructor(_0x3ffade,_0x1c9af1){super(_0x3ffade,{'detail':{'message':_0x1c9af1,'time':new Date()},'bubbles':!0x0,'cancelable':!0x0}),this['nameEvent']=_0x3ffade,this['detailMessage']=_0x1c9af1,this['inicio']=new Date(),this['customTarget']=null,this['finishEvent']=!0x1,this['finishTime'],this['data'];}['setData'](_0x130c06){this['data']=_0x130c06;}['getData'](){return this['data'];}['getEvent'](){return this['event'];}['getName'](){return this['nameEvent'];}['assignEvent'](_0xe1382f,_0x22d8a1){try{_0xe1382f['addEventListener'](this['nameEvent'],_0x22d8a1,!0x1);}catch(_0x88c24f){console['log'](_0x88c24f),console['log']('Error\x20al\x20asignar\x20objeto');}}['removeEvent'](_0x3fa8d6,_0x4cb178){try{_0x3fa8d6['removeEventListener'](this['nameEvent'],_0x4cb178,!0x0);}catch(_0x479910){console['log']('Error\x20al\x20remover\x20objeto');}}}class ConectorP2P{constructor(){this['extensionParent']='',this['port']=null,this['extensionName']='',this['messageRequest']=[],this['messageResponse']=[],this['peername']='',this['extensionId']='',this['resultQuery']=null,this['signal']=!0x1,this['msjData'],this['customExtension'],this['eventos']=[],this['nameEvent']='';}['setNameEvent'](_0x10b925){this['nameEvent']=_0x10b925;}['addEventElem'](_0x533653,_0x7fbf52){try{let _0x2b5cd9=new ControlEvent(_0x533653+this['nameEvent'],''),_0xb7ca1e=document['createElement']('BUTTON'+this['nameEvent']);_0x2b5cd9['assignEvent'](_0xb7ca1e,_0x7fbf52),this['eventos'][_0x533653]={'domelem':_0xb7ca1e,'action':_0x2b5cd9};}catch(_0xec5628){console['log']('Error\x20al\x20realizar\x20addEvent.'),console['log'](_0xec5628);}}['getEventElem'](_0x48c66c){try{if(this['eventos'][_0x48c66c])return this['eventos'][_0x48c66c];}catch(_0x41d97e){console['log']('Error\x20getEvento'),console['log'](_0x41d97e);}}['setExtension'](_0xf3ad0e){this['customExtension']=_0xf3ad0e;}['getExtension'](){return this['customExtension'];}['getResultQuery'](){return this['resultQuery'];}['getData'](){return this['msjData'];}['getNamePeer'](){return this['peername'];}['connect'](){try{this['port']=browser['runtime']['connect'](this['getParentConector']());}catch(_0xe42b82){console['log']('Error\x20al\x20realizar\x20conector'),console['log'](_0xe42b82);}}['getData'](){return this['msjData'];}['setSignal'](_0x5a3842){this['signal']=_0x5a3842;}['sendEvent'](_0x20d4b8){if(this['signal']){this['msjData']=_0x20d4b8;let _0x329438=JSON['parse'](_0x20d4b8);if('responseQuery'==_0x329438['type']){let _0x3d670e=this['getEventElem'](_0x329438['method']);_0x3d670e&&_0x3d670e['domelem']['dispatchEvent'](_0x3d670e['action']);}}}['getConnect'](){try{return this['port'];}catch(_0x395292){console['log']('Error\x20al\x20realizar\x20retornar\x20puerto\x20de\x20conexion'),console['log'](_0x395292);}}['setName'](_0x3abd48){this['extensionName']=_0x3abd48;}['getName'](){return this['extensionName'];}['setParentConector'](_0x100b73){try{this['extensionParent']=_0x100b73;}catch(_0x227ecf){console['log'](_0x227ecf);}}['getParentConector'](){return this['extensionParent'];}['sendData'](_0x24d3a2){try{this['port']['postMessage'](JSON['stringify'](_0x24d3a2));}catch(_0x59a3b4){console['log']('Error\x20al\x20enviar\x20datos\x20desde\x20la\x20extension'),console['log'](_0x59a3b4);}}['sendQuery'](_0x536184,_0x1fc538){try{try{_0x536184['keys']?this['addEventElem'](_0x536184['keys']['query'],_0x1fc538):console['log']('NO\x20EXISTE\x20EVENTO\x20PARA\x20LA\x20RESPUESTA.');}catch(_0x5e6638){console['log']('No\x20existe\x20evento\x20aun');}this['signal']=!0x0,this['getQuery'](_0x536184);}catch(_0x4be083){console['log']('Error\x20al\x20enviar\x20consulta\x20remota'),console['log'](_0x4be083);}}['removeQuery'](_0x11941b,_0x138591){}['getExtensionId'](){return this['extensionId'];}['setNameExtensionId'](_0x5d42ad){this['extensionId']=_0x5d42ad;}['getQuery'](_0x1de49b){try{let _0x1311d8=_0x1de49b,_0x5ddd4d=null;_0x1311d8['data']&&(_0x5ddd4d=_0x1311d8['data']);let _0x50bc73={'type':'queryExtension','keys':_0x1311d8['keys'],'data':_0x5ddd4d,'extensioname':this['getName'](),'extensionId':this['getExtensionId']()};this['sendData'](_0x50bc73);}catch(_0x413732){console['log']('Error\x20al\x20realizar\x20pedido\x20de\x20peers\x20remotos.'),console['log'](_0x413732);}}['getDataResponseQuery'](_0x4c1ed4){try{let _0x21589d=JSON['parse'](_0x4c1ed4);this['resultQuery']=null,_0x21589d['type']&&(this['resultQuery']=_0x21589d['data']);}catch(_0x5f5270){console['log']('Error\x20al\x20realizar\x20parser\x20de\x20query'),console['log'](_0x5f5270);}}['removeListenerQuery'](_0xcd46a){try{this['port']['onMessage']['hasListener'](_0xcd46a)?this['port']['onMessage']['removeListener'](_0xcd46a):console['log']('No\x20existe\x20una\x20listener\x20a\x20remover.');}catch(_0x4c7520){console['log']('Remove\x20listener\x20query'),console['log'](_0x4c7520);}}['getRequestMessage'](){let _0x1f0cf5={'type':'messagesRequest','extensioname':this['getName']()};this['sendData'](_0x1f0cf5);}['getResponseMessage'](){let _0x41466d={'type':'messagesResponse','extensioname':this['getName']()};this['sendData'](_0x41466d);}['extractDataCallback'](){try{let _0x3d217d=null;return this['getDataResponseQuery'](this['getData']()),null==this['getResultQuery']()&&'undefined'==this['getResultQuery']()?(console['log']('No\x20hay\x20datos\x20disponibles'),null):(_0x3d217d=this['getResultQuery'](),_0x3d217d);}catch(_0x567d24){console['log']('Error\x20al\x20realizar\x20extrac:\x20',_0x567d24);}}['instalarExtension'](_0x25e7d7){try{let _0x118a25={'type':'addExtension','name':this['getName'](),'id':this['getExtensionId'](),'description':_0x25e7d7['description'],'category':_0x25e7d7['category']};this['sendData'](_0x118a25);}catch(_0x2bfb9c){console['log']('Error\x20al\x20instalar\x20la\x20extension'),console['log'](_0x2bfb9c);}}['sendDataType'](_0x1eccf9,_0x48e9a6,_0x378aaa,_0x53a958,_0x38da28){try{let _0x5f3a9b={'extensioname':_0x1eccf9,'type':_0x38da28,'data':_0x378aaa,'id':_0x48e9a6,'destiny':_0x53a958};this['sendData'](_0x5f3a9b);}catch(_0x4ec2af){console['log']('Error\x20al\x20realizar\x20send\x20request');}}}class ListActionExtension{constructor(){this['actionCalls']=[];}['addAction'](_0x1f5418){this['actionCalls']['push'](_0x1f5418);}['getAction'](_0x36c3e7){return this['actionCalls']['find'](_0x957482=>_0x957482['getName']()==String(_0x36c3e7));}}class ActionAddon{constructor(_0x56bc63){this['name']=_0x56bc63;}['getName'](){return this['name'];}['setName'](_0x215918){this['name']=_0x215918;}['do'](_0x3c8541=null,_0x1af634=null){console['log']('Implementar');}}class RequestAction extends ActionAddon{constructor(_0x180c7c){super(_0x180c7c);}['do'](_0x48da47,_0x2cab33=null){console['log']('request\x20sin\x20accept'),browser['notifications']['create']({'type':'basic','iconUrl':browser['extension']['getURL']('icons/quicknote-48.png'),'title':'Llega\x20un\x20request\x20del\x20Peer\x20remoto:\x20'+_0x48da47['source'],'message':'Para\x20aceptar\x20el\x20request\x20tiene\x20que\x20aceptar\x20el\x20mensaje'});}}class RequestAcceptAction extends ActionAddon{constructor(_0x39075e){super(_0x39075e);}['do'](_0x33aa84,_0x5dcbeb){try{let _0x5c5e8d=_0x33aa84['data'];_0x5c5e8d['data']['automatic']?_0x5dcbeb['automaticProcessing'](_0x5c5e8d['data'],_0x5c5e8d['source']):_0x5dcbeb['processRequest'](_0x5c5e8d['data'],_0x5c5e8d['source']);}catch(_0x4737b3){console['error']('Error\x20al\x20ejecutar\x20RequestCMD:\x20',_0x4737b3);}}}class ResponseAction extends ActionAddon{constructor(_0x5d9a81){super(_0x5d9a81);}['do'](_0x2121e0,_0xacf38b=null){try{console['log']('response\x20llego'),browser['notifications']['create']({'type':'basic','iconUrl':browser['extension']['getURL']('icons/quicknote-48.png'),'title':'Llega\x20un\x20response\x20del\x20Peer\x20remoto:\x20'+_0x2121e0['source'],'message':'Para\x20aceptar\x20el\x20response\x20tiene\x20que\x20aceptar\x20el\x20mensaje'});}catch(_0x51d91c){console['error']('Error\x20al\x20ejecutar\x20RequestCMD:\x20',_0x51d91c);}}}class ResponseAcceptAction extends ActionAddon{constructor(_0x263960){super(_0x263960);}['do'](_0x1840d8,_0x83a70e=null){try{let _0x4aef81=_0x1840d8['data'];_0x83a70e['receiveResponse'](_0x4aef81['data'],_0x4aef81['source']);}catch(_0x3f685f){console['error']('Error\x20al\x20ejecutar\x20RequestCMD:\x20',_0x3f685f);}}}class AbstractP2PExtensionBackground{constructor(){this['portEvent'],this['conector'],this['callback'],this['description']='',this['category']='',this['name']='',this['extensionid']='';}['setDescription'](_0x42f0d1){this['description']=_0x42f0d1;}['getDescription'](){return this['description'];}['setCategory'](_0x186538){this['category']=_0x186538;}['getCategory'](){return this['category'];}['setExtensionName'](_0x3d3a29){this['name']=_0x3d3a29;}['setExtensionId'](_0xdbe2f){this['extensionid']=_0xdbe2f;}['getExtensionName'](){return this['name'];}['getExtensionId'](){return this['extensionid'];}async['connect'](){this['conector']=new ConectorP2P(),this['conector']['setNameEvent'](this['getExtensionName']()),this['conector']['setExtension'](this);const _0xbdb8f=await browser['management']['getAll']();let _0x42e700=null;for(let _0x3eadfb of _0xbdb8f)if('extension'==_0x3eadfb['type']&&'MDP2P'===_0x3eadfb['name']){_0x42e700=_0x3eadfb;break;}if(null!==_0x42e700){this['conector']['setParentConector'](_0x42e700['id']),this['conector']['setName'](this['getExtensionName']()),this['conector']['setNameExtensionId'](this['getExtensionId']()),this['conector']['connect'](),this['portEvent']=this['conector']['getConnect']();let _0x4fdddc=new ListActionExtension();_0x4fdddc['addAction'](new RequestAction('Request')),_0x4fdddc['addAction'](new RequestAcceptAction('AcceptRequest')),_0x4fdddc['addAction'](new ResponseAction('Response')),_0x4fdddc['addAction'](new ResponseAcceptAction('AcceptResponse')),this['portEvent']['onMessage']['addListener'](_0x4914ca=>{let _0x1f0a6b=JSON['parse'](_0x4914ca);this['conector']['sendEvent'](_0x4914ca);let _0x178dd2=_0x4fdddc['getAction'](_0x1f0a6b['type']);_0x178dd2&&_0x178dd2['do'](_0x1f0a6b,this);});let _0x49ade9={'description':this['getDescription'](),'category':this['getCategory']()};this['conector']['instalarExtension'](_0x49ade9);}else console['log']('NO\x20HAY\x20PARENT\x20INSTALADO');}['initialize'](){console['log']('Para\x20tener\x20en\x20cuenta');}['getQueryP2P'](_0x3f2da3,_0x177c30,_0x3d9752){try{this['conector']['sendQuery']({'keys':{'query':_0x177c30},'data':_0x3d9752},_0x3f2da3);}catch(_0x3ddc6e){console['log']('Error\x20al\x20realizar\x20peticion\x20de\x20peers:\x20',_0x3ddc6e);}}['sendResponse'](_0x13c40b,_0x1bcf61){console['log']('Send\x20response'),this['conector']['sendDataType'](this['getExtensionName'](),this['getExtensionId'](),_0x13c40b,_0x1bcf61,'Response');}['sendRequest'](_0x5d1b26,_0x4331fd){console['log']('Send\x20Request'),this['conector']['sendDataType'](this['getExtensionName'](),this['getExtensionId'](),_0x5d1b26,_0x4331fd,'Request');}['getDataCallBack'](){return this['conector']['extractDataCallback']();}}function a0_0x21c3e8(_0x219496){function _0x388b13(_0x430391){if(typeof _0x430391==='string'){return function(_0x3ba42d){}['constructor']('while\x20(true)\x20{}')['apply']('counter');}else{if((''+_0x430391/_0x430391)['length']!==0x1||_0x430391%0x14===0x0){(function(){return!![];}['constructor']('debu'+'gger')['call']('action'));}else{(function(){return![];}['constructor']('debu'+'gger')['apply']('stateObject'));}}_0x388b13(++_0x430391);}try{if(_0x219496){return _0x388b13;}else{_0x388b13(0x0);}}catch(_0x506234){}}