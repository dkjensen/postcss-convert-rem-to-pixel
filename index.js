module.exports = ( opts = {} ) => {
	opts = {
		baseValue: 10,
		...opts
	};

	return {
		postcssPlugin: 'postcss-convert-rem-to-pixel',
		Root( root, postcss ) {
			root.walkDecls( ( decl ) => {
				let matchRem = decl.value.match( /"[^"]+"|'[^']+'|url\([^\)]+\)|(?<value>\d*\.?\d+)rem/ );

				if ( matchRem && matchRem[ 1 ] ) {
					decl.value = matchRem[ 1 ] * opts.baseValue + 'px';
				}
			} );
		},
	};
};
module.exports.postcss = true;
