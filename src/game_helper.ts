export function createShader(gl: WebGLRenderingContext, type: number, shaderSource: string) {
	const shader = gl.createShader(type);

	gl.shaderSource(shader!, shaderSource);
	gl.compileShader(shader!);

	return shader!;
}

export function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
	const program = gl.createProgram() as WebGLProgram;

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		throw new Error(gl.getProgramInfoLog(program) || '');
	}
	gl.useProgram(program);

	return program!;
}
