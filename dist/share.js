
// a few references:
// 	  http://chriswren.github.io/native-social-interactions/
//    https://nimiq.github.io/web-share-shim/demo/

navigator.share = navigator.share || (function(){

	const languages = {
		default: {
			sms: 'SMS',
			messenger: 'Messenger',
			whatsapp: 'WhatsApp',
			twitter: 'Twitter',
			linkedin: 'Linkedin',
			telegram: 'Telegram',
			facebook: 'Facebook',
			skype: 'Skype'
		},
		zh: {
			shareTitle: '分享',
			cancel: '取消',
			copy: '複製連結',
			print: '列印',
			email: 'E-mail',
			selectSms: '選擇聯絡人'
		},
		pt: {
			shareTitle: 'Compartilhar',
			cancel: 'Cancelar',
			copy: 'Copiar',
			print: 'Imprimir',
			email: 'E-mail',
			selectSms: 'Selecione um contato'
		},
		en: {
			shareTitle: 'Share',
			cancel: 'Cancel',
			copy: 'Copy',
			print: 'Print',
			email: 'E-mail',
			selectSms: 'Pick a contact'
		},
		es: {
			shareTitle: 'Compartir',
			cancel: 'Cancelar',
			copy: 'Copiar',
			print: 'Imprimir',
			email: 'Correo',
			selectSms: 'Seleccionar un contacto'
		}
	};
	const language = {...languages.default, ...(languages[navigator.language.substr(0, 2).toLowerCase()] || languages.en)};

	let android = navigator.userAgent.match(/Android/i);
	let ios = navigator.userAgent.match(/iPhone|iPad|iPod/i);
  // let ios = navigator.userAgent.match(/iPhone|iPad|iPod|Macintosh/i);
  const isDesktop = !(ios || android);
  const canSVG = !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect);

  const icon = {
    'email': 'data:image/svg+xml;utf8,<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#424242"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>',
    'copy': 'data:image/svg+xml;utf8,<svg width="448" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#424242"><path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg>',
    'print': 'data:image/svg+xml;utf8,<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#424242"><path d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"></path></svg>',
    'sms': 'data:image/svg+xml;utf8,<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#424242"><path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path></svg>',
    'messenger': 'data:image/svg+xml;utf8,<svg width="448" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#0084ff"><path d="M224 32C15.9 32-77.5 278 84.6 400.6V480l75.7-42c142.2 39.8 285.4-59.9 285.4-198.7C445.8 124.8 346.5 32 224 32zm23.4 278.1L190 250.5 79.6 311.6l121.1-128.5 57.4 59.6 110.4-61.1-121.1 128.5z"></path></svg>',
    'facebook': 'data:image/svg+xml;utf8,<svg width="264" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 512" fill="#3b5998"><path d="M215.8 85H264V3.6C255.7 2.5 227.1 0 193.8 0 124.3 0 76.7 42.4 76.7 120.3V192H0v91h76.7v229h94V283h73.6l11.7-91h-85.3v-62.7c0-26.3 7.3-44.3 45.1-44.3z"></path></svg>',
    'whatsapp': 'data:image/svg+xml;utf8,<svg width="448" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#075e54"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>',
    'twitter': 'data:image/svg+xml;utf8,<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#1da1f2"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>',
    'linkedin': 'data:image/svg+xml;utf8,<svg width="448" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#0077b5"><path d="M100.3 448H7.4V148.9h92.9V448zM53.8 108.1C24.1 108.1 0 83.5 0 53.8S24.1 0 53.8 0s53.8 24.1 53.8 53.8-24.1 54.3-53.8 54.3zM448 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448h-.1z"></path></svg>',
    'telegram': 'data:image/svg+xml;utf8,<svg width="448" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#0088cc"><path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path></svg>',
    'skype':  'data:image/svg+xml;utf8,<svg width="448" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#00aff0"><path d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"></path></svg>',
  }

	function appendCSS (content) {
		var css = content,
			head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');

		style.type = 'text/css';
		if (style.styleSheet){
			// This is required for IE8 and below.
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		style.id = 'shareAPIPolyfill-style';

		head.appendChild(style);
	}

	return function ShareAPIPolyfill (data = {}) {

		return new Promise((resolve, reject) => {

			if (!data.title || typeof data.title !== 'string' || !data.text || typeof data.text !== 'string') {
				reject('Invalid Params');
			}

			const { title, url, fbId, hashtags } = data;
			const text = data.text || title;

			appendCSS(`
#shareAPIPolyfill-backdrop,
#shareAPIPolyfill-container {
 opacity: 0;
 pointer-events: none;
 position: fixed;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 margin: auto;
 width: 100%;
 height: 100%;
 will-change: opacity;
}
#shareAPIPolyfill-backdrop {
	transition: opacity linear 250ms;
	background-color: rgba(0, 0, 0, 0.6);
}
#shareAPIPolyfill-container {
 background-color: #f9f9f9;
 top: auto;
 max-width: 400px;
 height: auto;
 transition-property: transform,opacity;
 transition-timing-function: linear;
 transition-duration: 250ms;
 transition-delay: 150ms;
 transform: translateY(100%);
 font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", arial, sans-serif, "Microsoft JhengHei";
}
#shareAPIPolyfill-backdrop.visible,
#shareAPIPolyfill-container.visible {
 opacity: 1;
 pointer-events: all;
}
#shareAPIPolyfill-container.visible {
 transform: translateY(0);
}
#shareAPIPolyfill-container .shareAPIPolyfill-header {
 background: #EEE;
}
#shareAPIPolyfill-container .shareAPIPolyfill-header .shareAPIPolyfill-icons-container {
 display: flex;
}
#shareAPIPolyfill-container .shareAPIPolyfill-header-title {
 background-color: #E0E0E0;
 padding: 10px;
 color: #424242;
 font-weight: 600;
}
#shareAPIPolyfill-container .shareAPIPolyfill-body {
 border-top: solid 1px #EEE;
}
#shareAPIPolyfill-container .shareAPIPolyfill-footer {
 transition: opacity ease-in 250ms;
 border-top: solid 1px #EEE;
 background-color: #EEE;
 text-align: center;
 padding: 10px;
 cursor: pointer;
 opacity: .5;
}
#shareAPIPolyfill-container .shareAPIPolyfill-footer:hover {
 opacity: 1;
}
#shareAPIPolyfill-container .shareAPIPolyfill-icons-container {
 display: flex;
 flex-wrap: wrap;
}
#shareAPIPolyfill-container .tool-icon {
 width: 25%;
 box-sizing: border-box;
 font-weight: 400;
 font-size: 12px;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 cursor: pointer;
 padding: 20px 0;
}
#shareAPIPolyfill-container .tool-icon:hover {
  box-shadow: 0 0 10px rgba(0,0,0, .125);
}
#shareAPIPolyfill-container .the-icon-title {
 padding-top: 10px;
}
#shareAPIPolyfill-container .tool-icon .the-icon {
 display: block;
 margin: auto;
 width: 42px;
 height: 36px;
 color: #424242;
 background-repeat: no-repeat;
 background-size: contain;
 background-position: center;
}
#shareAPIPolyfill-container .tool-icon.email .the-icon {background-image: url('`+ icon.email +`')}
#shareAPIPolyfill-container .tool-icon.copy .the-icon {background-image: url('`+ icon.copy +`')}
#shareAPIPolyfill-container .tool-icon.print .the-icon {background-image: url('`+ icon.print +`')}
#shareAPIPolyfill-container .tool-icon.sms .the-icon {background-image: url('`+ icon.sms +`')}
#shareAPIPolyfill-container .tool-icon.messenger .the-icon {background-image: url('`+ icon.messenger +`')}
#shareAPIPolyfill-container .tool-icon.facebook .the-icon {background-image: url('`+ icon.facebook +`')}
#shareAPIPolyfill-container .tool-icon.whatsapp .the-icon {background-image: url('`+ icon.whatsapp +`')}
#shareAPIPolyfill-container .tool-icon.twitter .the-icon {background-image: url('`+ icon.twitter +`')}
#shareAPIPolyfill-container .tool-icon.linkedin .the-icon {background-image: url('`+ icon.linkedin +`')}
#shareAPIPolyfill-container .tool-icon.telegram .the-icon {background-image: url('`+ icon.telegram +`')}
#shareAPIPolyfill-container .tool-icon.skype .the-icon {background-image: url('`+ icon.skype +`')}
`);

			function closeShareUI () {
				const removeBackdrop = () => {
					backdrop.removeEventListener('transitionend', removeBackdrop);
					document.body.removeChild(backdrop);
				}

				const removeContainer = () => {
					container.removeEventListener('transitionend', removeContainer);
					document.body.removeChild(container);
					document.head.removeChild(document.querySelector('#shareAPIPolyfill-style'));
					document.removeEventListener('keyup', keyCloseEvent);
				}

				backdrop.classList.remove('visible');
				container.classList.remove('visible');

				backdrop.addEventListener('transitionend',  removeBackdrop);
				container.addEventListener('transitionend', removeContainer);
			}

			const backdrop = document.createElement('div');
			const container = document.createElement('div');
			backdrop.id = 'shareAPIPolyfill-backdrop';
			container.id = 'shareAPIPolyfill-container';

			container.innerHTML = `
<div class="shareAPIPolyfill-header">
 <div class="shareAPIPolyfill-header-title">${language.shareTitle}</div>
 <div class="shareAPIPolyfill-icons-container">
  <div class="tool-icon copy" data-tool="copy">
   <div class="the-icon"></div>
   <div class="the-icon-title">${language.copy}</div>
  </div>
  <div class="tool-icon print" data-tool="print">
   <div class="the-icon"></div>
   <div class="the-icon-title">${language.print}</div>
  </div>
  <div class="tool-icon email" data-tool="email">
   <div class="the-icon"></div>
   <div class="the-icon-title">${language.email}</div>
  </div>
  <div class="tool-icon sms" data-tool="sms">
   <div class="the-icon"></div>
   <div class="the-icon-title">${language.sms}</div>
  </div>
 </div>
</div>
<div class="shareAPIPolyfill-body">
 <div class="shareAPIPolyfill-icons-container">
  ${(fbId ? `
   <div class="tool-icon messenger" data-tool="messenger">
    <div class="the-icon"></div>
    <div class="the-icon-title">${language.messenger}</div>
   </div>
  ` : '')}
  <div class="tool-icon facebook" data-tool="facebook">
   <div class="the-icon"></div>
   <div class="the-icon-title">${language.facebook}</div>
  </div>
  <div class="tool-icon whatsapp" data-tool="whatsapp">
   <div class="the-icon"></div>
   <div class="the-icon-title">${language.whatsapp}</div>
  </div>
  <div class="tool-icon twitter" data-tool="twitter">
   <div class="the-icon"></div>
   <div class="the-icon-title">${language.twitter}</div>
  </div>
  <div class="tool-icon linkedin" data-tool="linkedin">
   <div class="the-icon"></div>
   <div class="the-icon-title">${language.linkedin}</div>
  </div>
  <div class="tool-icon telegram" data-tool="telegram">
   <div class="the-icon"></div>
   <div class="the-icon-title">${language.telegram}</div>
  </div>
  <div class="tool-icon skype skype-share" data-tool="skype" data-href="${url}" data-text="${title + ': ' + url}">
   <div class="the-icon"></div>
   <div class="the-icon-title">${language.skype}</div>
  </div>
 </div>
 <div class="shareAPIPolyfill-footer">
  ${language.cancel}
 </div>
</div>
`;

			backdrop.addEventListener('click', () => {
				closeShareUI();
			});

			function keyCloseEvent (event) {
				if (event.keyCode === 27) { // ESC
					closeShareUI();
				}
			}
			addSkypeSupport();
			// First, add the elements to the document in the current frame
			requestAnimationFrame(_ => {
				document.body.appendChild(backdrop);
				document.body.appendChild(container);
				document.addEventListener('keyup', keyCloseEvent);
				bindEvents();
				// Then, once the elements are added, add the "animatable status" classes
				requestAnimationFrame(() => {
					backdrop.classList.add('visible');
					container.classList.add('visible');
				})
			});

			function addSkypeSupport () {
				(function(r, d, s) {
					r.loadSkypeWebSdkAsync = r.loadSkypeWebSdkAsync || function(p) {
						var js, sjs = d.getElementsByTagName(s)[0];
						if (d.getElementById(p.id)) { return; }
						js = d.createElement(s);
						js.id = p.id;
						js.src = p.scriptToLoad;
						js.onload = p.callback
						sjs.parentNode.insertBefore(js, sjs);
					};
					var p = {
						scriptToLoad: 'https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js',
						id: 'skype_web_sdk'
					};
					r.loadSkypeWebSdkAsync(p);
				})(window, document, 'script');
			}

			function bindEvents () {
				Array.from(container.querySelectorAll('.tool-icon')).forEach(tool => {
					tool.addEventListener('click', event => {
						switch (tool.dataset.tool) {
							case 'copy': {
								navigator.clipboard.writeText(url);
								break;
							}
							case 'print': {
								self.print();
								break;
							}
							case 'email': {
								window.open("mailto:"+''+'?subject='+title+'&body='+url);
								break;
							}
							case 'sms': {
								// window.open(toolsUrls.sms(title + ': \n' + url));
								location.href = `sms:${language.selectSms}?&body=${title}: ${url}`;
								// window.open("sms:"+''+'?subject='+title+'&body='+url);
								break;
							}
							case 'messenger': {
								window.open(
									'http://www.facebook.com/dialog/send?' +
										'app_id=' + fbId +
										'&display=popup' +
										'&href=' + encodeURIComponent(url) +
										'&link=' + encodeURIComponent(url) +
										'&redirect_uri=' + encodeURIComponent(url) +
										'&quote=' + title + ': ' + url
								);

								break;
							}
							case 'facebook': {
								window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
								break;
							}
							case 'whatsapp': {
								const payload = text + ': ' + url;
								window.open((isDesktop ? 'https://api.whatsapp.com/send?text=' : 'whatsapp://send?text=') + payload);
								break;
							}
							case 'twitter': {
								window.open(`http://twitter.com/share?text=${text}&url=${url}&hashtags=${hashtags || ''}`);
								break;
              }
							case 'linkedin': {
								window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}&source=LinkedIn`);
								break;
							}
							case 'telegram': {
								window.open((isDesktop ? 'https://telegram.me/share/msg?url='+url+'&text=' + text: 'tg://msg?text=' + text + ': ' + payload));
								break;
							}
							case '': {
								break;
							}
						}
						resolve();
						closeShareUI();
					});
				});
				container.querySelector('.shareAPIPolyfill-footer').addEventListener('click', closeShareUI);
			}
		});
	};

}());
