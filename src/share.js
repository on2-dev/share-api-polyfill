
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

  icon = {
    'email': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>',
    'copy': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg>',
    'print': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"></path></svg>',
    'sms': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path></svg>',
    'messenger': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 32C15.9 32-77.5 278 84.6 400.6V480l75.7-42c142.2 39.8 285.4-59.9 285.4-198.7C445.8 124.8 346.5 32 224 32zm23.4 278.1L190 250.5 79.6 311.6l121.1-128.5 57.4 59.6 110.4-61.1-121.1 128.5z"></path></svg>',
    'facebook': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"></path></svg>',
    'whatsapp': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 122.8c-72.7 0-131.8 59.1-131.9 131.8 0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6 49.9-13.1 4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8 0-35.2-15.2-68.3-40.1-93.2-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8-12.6 1.9-22.4.9-47.5-9.9-39.7-17.2-65.7-57.2-67.7-59.8-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5 2.6 0 5.3 0 7.6.1 2.4.1 5.7-.9 8.9 6.8 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6 15.3 26.3 30.6 35.4 53.9 47.1 4 2 6.3 1.7 8.6-1 2.3-2.6 9.9-11.6 12.5-15.5 2.6-4 5.3-3.3 8.9-2 3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5 29.9 30 47.9 69.8 47.9 112.2 0 87.4-72.7 158.5-160.1 158.5z"></path></svg>',
    'twitter': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>',
    'linkedin': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>',
    'telegram': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"></path></svg>',
    'skype':  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"></path></svg>'
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
