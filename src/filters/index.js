/**
 * 文字超出隐藏
 * @param {*} string 
 * @param {*} maxNum 
 */
export function setMaxWords(string, maxNum) {
  return string.substring(0, maxNum) + '...'
}

/**
 * 提取html中文本
 * @param {*} string 
 * @param {*} maxNum 
 */
export function htmlToTxt(html) {
	return html.replace(new RegExp('<[^<>]+>', 'g'), "")
}
