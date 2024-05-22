/**
 * https://github.com/systemjs/systemjs/blob/main/docs/hooks.md
 * 扩展 glsl 模块类型
 */

const _fetch = System.constructor.prototype.fetch.bind(System.constructor.prototype);
System.constructor.prototype.fetch = function (url) {
	/**
	 * 重新定义 glsl 文件的加载,不影响原来文件的加载方式
     * 加载成功的内容，返回格式参考 new Response(new Blob([
            'System.register([],function(e){return{execute:function(){e("default",' + JSON.stringify(json) + ')}}})'
          ], {
            type: 'application/javascript'
          }));
	 */
	if (url.endsWith('.glsl')) {
		return new Promise((resolve, reject) => {
			fetch(url)
				.then(res => res.text())
				.then(text => {
					resolve(
						new Response(
							new Blob(['System.register([],function(e){return{execute:function(){e("default",' + JSON.stringify(text) + ')}}})'], {
								type: 'application/javascript',
							}),
						),
					);
				});
		});
	}
	return _fetch(url);
};
