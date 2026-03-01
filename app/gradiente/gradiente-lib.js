export class Gradient {
  constructor() {
    this.canvas = null;
    this.gl = null;
  }

  initGradient(selector) {
    this.canvas = document.querySelector(selector);
    if (!this.canvas) return;

    this.gl = this.canvas.getContext("webgl", { alpha: true });
    if (!this.gl) {
      console.warn("WebGL not supported");
      return;
    }

    const vertex = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Shader com efeito de água mais pronunciado
    const fragment = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      // Função de ruído simplificada para ondas mais orgânicas
      float noise(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        
        // Múltiplas ondas com diferentes frequências (efeito água)
        float wave1 = sin(u_time * 0.3 + st.x * 4.0) * 0.15;
        float wave2 = sin(u_time * 0.4 + st.y * 5.0) * 0.12;
        float wave3 = sin(u_time * 0.2 + (st.x + st.y) * 3.0) * 0.1;
        
        // Ruído sutil para efeito mais orgânico
        float n = noise(st + u_time * 0.05) * 0.03;
        
        // Combina todas as ondas
        float intensity = wave1 + wave2 + wave3 + n;
        
        // Transição azul → branco → azul
        // Valores menores = mais azul, valores maiores = mais branco
        float r = 0.85 + intensity * 0.3;
        float g = 0.90 + intensity * 0.25;
        float b = 1.0;
        
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `;

    const program = this.createProgram(vertex, fragment);
    if (!program) return;
    
    this.gl.useProgram(program);

    const positionLocation = this.gl.getAttribLocation(program, "a_position");
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      this.gl.STATIC_DRAW
    );

    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);

    const timeLocation = this.gl.getUniformLocation(program, "u_time");
    const resolutionLocation = this.gl.getUniformLocation(program, "u_resolution");

    // Ajusta tamanho do canvas
    const resize = () => {
      this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
      this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Loop de animação
    const render = (time) => {
      this.gl.uniform1f(timeLocation, time * 0.001);
      this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    render(0);
  }

  createProgram(vertex, fragment) {
    const vs = this.createShader(this.gl.VERTEX_SHADER, vertex);
    const fs = this.createShader(this.gl.FRAGMENT_SHADER, fragment);
    
    if (!vs || !fs) return null;
    
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vs);
    this.gl.attachShader(program, fs);
    this.gl.linkProgram(program);
    
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error("Program link error:", this.gl.getProgramInfoLog(program));
      return null;
    }
    
    return program;
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", this.gl.getShaderInfoLog(shader));
      return null;
    }
    
    return shader;
  }
}