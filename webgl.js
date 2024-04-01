
window.addEventListener("load", setupWebGL);
const canvas = document.querySelector("canvas"),
     program, gl;

function getRenderingContext (as) {
  if    (typeof canvas         !== "object"
  ||           !canvas.tagName === "canvas")
/*//*/                              return;

  Object.assign(canvas,
      {  width: canvas.clientWidth,
        height: canvas.clientHeight });

  const gl
  = canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl");

  if (!gl)
  return console.error(
    "Failed to get WebGL context.",
    "Your browser or device may not support WebGL."
  );

  gl.viewport(0, 0, gl.drawingBufferWidth,
                    gl.drawingBufferHeight);
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  return gl;
}

function setupWebGL (evt) {
  window.removeEventListener(evt.type, setupWebGL, false);
  if (!(gl = getRenderingContext(canvas)))
                               { return }

  let program = gl.createProgram();
  let shaders = Object.fromArray(
   [[   "vertex-shader", gl.VERTEX_SHADER   ],
    [ "fragment-shader", gl.FRAGMENT_SHADER ]]
           .map(shader =>
    [   compile.apply(program, shader)   ]));

  gl.linkProgram(program);
  gl.useProgram(program);

  let attributeLocation
   =  0;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(attributeLocation);
  gl.vertexAttribPointer(attributeLocation, 3, gl.FLOAT, false, 0, 0);

// gl.deleteProgram(program);
}

function compile (shader) {
  var program;
  if  (!shader instanceof Array
  ||   !(this) instanceof WebGLProgram
  ||   shader.length !== 2) { return }
  try {
   gl.shaderSource(shader[1], document
    .querySelector(shader[0]).innerHTML);

   gl.compileShader(               shader[1]);
   gl.attachShader((program=this), shader[1]);


   return (shader[0] =
           shader[0].replace("-", "_"))
     &&    shader;

  } catch (e) { throw e }; 
}

 //////////
/*  for (const [vs, fs, prog] of programs) {
   if (!gl.getProgramParameter(prog,
        gl.LINK_STATUS)) {}
}

if (gl.getProgramParameter(prog,
   ext.COMPLETION_STATUS_KHR)) {}}  
                                        */
                               //////////

 ///////////////////////////////////////////////
/* "neighboring pixels & texels no overflow!"
   developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices  (hereby abbreviated from)
 */// ------------------------------------------

 ///////////////////////////////////////////////
/*  on minimum requirements for WebGL

    MAX_CUBE_MAP_TEXTURE_SIZE: 4096
    MAX_RENDERBUFFER_SIZE: 4096
    MAX_TEXTURE_SIZE: 4096
    MAX_VIEWPORT_DIMS: [4096,4096]
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 4
    MAX_TEXTURE_IMAGE_UNITS: 8
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 8
    MAX_VERTEX_ATTRIBS: 16
    MAX_VARYING_VECTORS: 8
    MAX_VERTEX_UNIFORM_VECTORS: 128
    MAX_FRAGMENT_UNIFORM_VECTORS: 64
    ALIASED_POINT_SIZE_RANGE: [1,100]


 ///////////////////////////////////////////////
/*  notes on architecture

    pipelines are the tuple of shader program,
    depth / stencil / multisample / blend 
                   / rasterization state
  … are implicit in OpenGL and WebGL,
     formalized explicitly in Vulkan


    memory usage of depth and stencil formats
 …  depth and stencil attachments and formats
    may appear in monoform on many devices
   (DEPTH_COMPONENT24 or STENCIL_INDEX8 => 
                         D24X8 and X24S8 32bpp)
 …  assume format memory usage is rounded up
                   to the nearest four bytes


 ///////////////////////////////////////////////
/*  WebGL optimization guidelines

    use invalidateFrameBuffer

    changing FBO attachment bindings
    invalidates framebuffer completeness
 => set up your hot framebuffers ahead of time
   (ff,about:config: webgl.perf.max-warnings=-1)
 

    changing vertexAttribPointer, (fetch limits,
 disable/enableVertexAttribArray  rebuild cache)
 => draw from static VAO attachments


    prefer doing work in   vertex shader
          rather than in fragment shader
 => shade vertices and interpolate on fragments


    always enable vertex attrib 0 as an array
 …  use bindAttribLocation &&
    enableVertexAttribArray(0))


---


    delete objects eagerly (handles at program)
   (live in-memory object references > deleting)  
 => use invalidateFrameBuffer to discard data
   (ie depth/stencil multisampled attachments)


    lose context eagerly via WEBGL_lose_context
   (of unneeded target canvas rendering result)


---


    flush() pending commands to retrive results 
   (for queries, completion of rendering frame)
 …  if not using requestAnimationFrame


    batching draw calls:
 -  drawArrays(), drawElements()
 -  drawArrays(TRIANGLE_STRIP)
 -  texture atlasing (avoid spliting draw calls)


    avoid API calls causing synchronous stalls
 …  costs: flush, roundtrip to GPU, recompile
 -  getError()
 -  get*Shader/Program…(): Parameter, InfoLog …
 => utilize parallel shader compilation
 -  checkFramebufferStatus()
 -  getBufferSubdata()
 -  readPixels() to CPU
 => use GPU-GPU readPixels with async readback
 ```
    function clientWaitAsync (sync, flags,
                                 interval) {
      return new Promise((resolve, reject) => {
         let res
           = gl.clientWaitSync(sync, flags, 0);

         if (res === gl.WAIT_FAILED)
            {        reject()      }
         if (res === gl.TIMEOUT_EXPIRED)
            {setTimeout(test, interval)}

         resolve();
      });
    }

    async function getBufferSubDataAsync(
      target,           buffer,
      srcByteOffset, dstBuffer,
                     dstOffset, length /// opt.
    ) {
      let sync=gl.fenceSync(
               gl.SYNC_GPU_COMMANDS_COMPLETE,0);
      gl.flush();

      await clientWaitAsync(gl, sync, 0, 10);
      gl.deleteSync(sync);

      gl.bindBuffer(target, buffer);
      gl.getBufferSubData(target, srcByteOffset, dstBuffer, dstOffset, length);
      gl.bindBuffer(target, null);

      return dest;
    }

    async function readPixelsAsync(
      gl, x, y, w, h, format, type, dest
    ) {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.PIXEL_PACK_BUFFER, buf);
      gl.bufferData(
        gl.PIXEL_PACK_BUFFER, dest.byteLength,
        gl.STREAM_READ
      );
      gl.readPixels(x, y, w, h, format, type, 0);
      gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);

      await getBufferSubDataAsync(
             gl.PIXEL_PACK_BUFFER, buf, 0, dest);

      gl.deleteBuffer(buf);
      return dest;
    }
    ```

    check compile status only when linking fails
   (compile status query is a synchronous call)
 …  many browsers can compile and link shaders
    and programs in parallel background threads:
    check LINK_STATUS,
       COMPILE_STATUS (only when linking fails), 
    COMPLETION_STATUS (via KHR_parallel compile)
 ```ext = gl
   .getExtension("KHR_parallel_shader_compile");
    
    function compileOnce(gl, shader) {
      if (shader.compiled) return;
          shader.compiled = true;
      gl.compileShader(shader);
    }
    for (const [vs, fs, prog] of programs) {
      compileOnce(gl, vs);
      compileOnce(gl, fs);
    }
    for (const [vs, fs, prog] of programs) {
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
    }
    for (const [vs, fs, prog] of programs) {
      gl.linkProgram(prog);
    }
    for (const [vs, fs, prog] of programs) {
     if (!gl.getProgramParameter(prog,
                       gl.LINK_STATUS)) {}
    }

    if (ext) {
    if (gl.getProgramParameter(prog,
          ext.COMPLETION_STATUS_KHR)) {}
    }


```

    consider rendering to a smaller back buffer
 => e.g. reduce canvas.style.width and height
         and upscale the result (preserve ratio)


    consider GPU compressed texture formats
 -  WEBGL_compressed_texture_s3tc  (desktop)
 -  WEBGL_compressed_texture_etc1  (Android)
 -  WEBGL_compressed_texture_pvrtc (iOS)
 -  WEBGL_compressed_texture_astc  (Web2GL)
   (high quality & compression, support issues)
 …  JPG and PNG smaller in size
            but larger on in GPU memory 
 => Basis Universal texture compression format
    and JavaScript library (to use at load time) 


    generateMipmaps() at 30% overhead
 …  downscale textures displayed in 3d
   (zooming out, or even for cube-maps)
 …  better fetch cache locality
   (neighboring pixels don't sample from texels)
 -  WebGL2: texStorage with `levels=1`
 -  WebGL1:
 ```
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameterf(gl.TEXTURE_2D,
                     gl.TEXTURE_MIN_FILTER,
                     gl.LINEAR);
   ///   Defaults to NEAREST_MIPMAP_LINEAR
   ```

    prefer texStorage + texSubImage to texImage
    to avoid allocation of mipmap beyond a level


    most texture uploads from DOM elements will
    cause a processing pass to switch GL program
    internally, causing a pipeline flush
 => prefer doing uploads before starting drawing
    or between pipelines


    GLSL (shader language) precision annotation
 …  be precise with GLSL annotations (remark OS)
 -  consult essl100 and essl300 requirements
   (ie passing 32b int between shaders, essl300)
 -  float texture on IOS: "highp sampler2D foo"
 -  "highp float" supported optionally in WebGL
   (precision reqs & getShaderPrecisionFormat())
 ```
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    ```

    inefficiencies by emulated RGB formats
 -  RGB32F is often RGBA32F and
    Luminance8 is often RGBA8
 -  RGB8 is slower than RGBA8 due to overhead of
    masking out of alpha channel
    or patching blend functions
 => use RGBA8 and ignore alpha (fragment shader)
 => avoid alpha:false param at context creation?


---


    builtins vs custom implementation:
    compiler can't reliably map custom code
    to special hardware builtin codepaths 
   (ie hyper-optimized hardware with
    special instructions for builtins)


    estimate per-pixel VRAM budget (API: !size):
    cap_max_VRAM_size
 / (window.innerWidth  * window.devicePixelRatio
 *  window.innerHeight * window.devicePixelRatio) 


 ///////////////////////////////////////////////
/*  usability tips

    using the ImageBitmapOptions dictionary *1
    to prepare textures for upload to WebGL
   (querying for browser support isn't built in)
 …  https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#imagebitmapoptions


    rendering into float RGBA32F texs may fail
                 (on many, many mobile systems)
 => check for render-to-float support (16b, 32b)
    WebGL1: EXT_color_buffer_half_float,
          WEBGL_color_buffer_float
    WebGL2: EXT_color_buffer_float,
            EXT_color_buffer_half_float
 => FRAMEBUFFER_INCOMPLETE_ATTACHMENT
          from checkFramebufferStatus()
 …  float16-blending is always supported,
    float32-blending test at EXT_float_blend


    ResizeObserver & `device-pixel-content-box`
 => async callback with new element size input
   (see supporting browsers, ie Chromium)

    devicePixelRatio and high-dpi rendering
    with special attention to avoid artifacts
         in case of `devicePixelRatio !== 1.0`
 => presnap canvas element to non-integer values
    for CSS `top`, `right`, `bottom`, `left` 

*///
/// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices (hereby abbreviated from)