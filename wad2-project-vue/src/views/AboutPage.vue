<template>
  <div class="p-2"></div>
  <!-- "where anyone is invited anywhere part start" -->
  <div class="container about-fadeup">
    <div class="row">
      <div class="col">
        <div class="about-header text-center p-3">
            Invite anyone, anywhere.
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="about-header-text mx-auto text-center">
            <div style="margin-bottom:10px">
              Ever wanted to go somewhere, but have no one to go with?
            </div>
            <div>
              That's where <span style="font-weight:bold">BOJIO</span> comes in.
            </div>
            
        </div>
      </div>
    </div>
  </div>

  <!-- WORLD 3D MODEL -->
  <div class="container about-fadeup" id="world-model">
    <Renderer ref="renderer" alpha antialias orbit-ctrl resize="window">
      <Camera :position="{ z: 5 }" />
      <Scene>
        <AmbientLight />
        <PointLight
          color="white"
          :position="{ x: 100, y: 10000, z: 40 }"
          :intensity="0.5"
        />
        <GltfModel
          ref="gltf"
          src="/Model/nanoplanet.gltf"
          @load="onReady"
          @progress="onProgress"
          @error="onError"
        />
      </Scene>
    </Renderer>
  </div>


    <div id="about-bojio-bg" class="p-2 mb-1 text-center reveal">
      <div class="mx-auto p-1 about-header">
        BOJIO
      </div>
      <div id="" class="mx-auto about-header-text">
        <i>verb: </i>/bo˨ 'tsjo˦/<br>
      </div>
      <div class="mx-auto about-header-text">
        <div class="text-center mt-2">To leave someone out from an event or activity by not inviting them.</div>
      </div>
    </div>


  <!-- how does it work section start -->
  <div class="reveal" style="margin-top: 15vmin">
    
    <div class="about-header text-center">
      How does our platform work?
    </div>

    <div class="about-header-text mx-auto text-center">
      <i>the three main ways to use our platform</i>
    </div>
  </div>


  <div class="container">

    <!-- join any group -->
    <div class="row reveal" style="margin-top: 10vmin">
      <div class="col-12 col-lg-6 text-center my-auto" id="first-step">
        <div class="about-step-header">Join any group</div>
        <span class="about-step-text mx-auto mb-5">
            Browse through groups that are open to all (a.k.a. 'public jios'), and join those that pique your interest.
        </span>
      </div>
      
      <!-- vertical carousel -->
      <!-- <div class="col-12 col-sm-6 wrapper carousel my-auto"> -->
        <div class='wrapper col col-lg-6 text-center'>
          <div class='carousel'>

            <div class='carousel__item container'>
              <div class='carousel__item-body row'>
                <div class='carousel__item-image-div col-4'>
                  <img class='image' src='https://play-lh.googleusercontent.com/CWzqShf8hi-AhV9dUjzsqk2URzdIv8Vk2LmxBzf-Hc8T-oGkLVXe6pMpcXv36ofpvtc'>
                </div>
                <div class='carousel__item-words col-8'>
                  <p class='title'>Dua Lipa Concert</p>
                  <p class='body'>24 October 2022<br> 8pm to 12am</p>
                  <p class='carousel__fake-button text-center my-auto'>
                    Create a Jio
                  </p>
                </div>
              </div>
            </div>

            <div class='carousel__item container'>
              <div class='carousel__item-body row'>
                <div class='carousel__item-image-div col-4'>
                  <img class='image' src='https://play-lh.googleusercontent.com/CWzqShf8hi-AhV9dUjzsqk2URzdIv8Vk2LmxBzf-Hc8T-oGkLVXe6pMpcXv36ofpvtc'>
                </div>
                <div class='carousel__item-words col-8'>
                  <p class='title'>Dua Lipa Concert</p>
                  <p class='body'>24 October 2022<br> 8pm to 12am</p>
                  <p class='carousel__fake-button text-center my-auto'>
                    Join a Jio
                  </p>
                </div>
              </div>
            </div>

            <div class='carousel__item container'>
              <div class='carousel__item-body row'>
                <div class='carousel__item-image-div col-4'>
                  <img class='image' src='https://play-lh.googleusercontent.com/CWzqShf8hi-AhV9dUjzsqk2URzdIv8Vk2LmxBzf-Hc8T-oGkLVXe6pMpcXv36ofpvtc'>
                </div>
                <div class='carousel__item-words col-8'>
                  <p class='title'>Dua Lipa Concert</p>
                  <p class='body'>24 October 2022<br> 8pm to 12am</p>
                  <p class='carousel__fake-button text-center my-auto'>
                    Find Out More
                  </p>
                </div>
              </div>
            </div>

            <div class='carousel__item container'>
              <div class='carousel__item-body row'>
                <div class='carousel__item-image-div col-4'>
                  <img class='image' src='https://play-lh.googleusercontent.com/CWzqShf8hi-AhV9dUjzsqk2URzdIv8Vk2LmxBzf-Hc8T-oGkLVXe6pMpcXv36ofpvtc'>
                </div>
                <div class='carousel__item-words col-8'>
                  <p class='title'>Dua Lipa Concert</p>
                  <p class='body'>24 October 2022<br> 8pm to 12am</p>
                  <p class='carousel__fake-button text-center my-auto'>
                    Create a Jio
                  </p>
                </div>
              </div>
            </div>

            <div class='carousel__item container'>
              <div class='carousel__item-body row'>
                <div class='carousel__item-image-div col-4'>
                  <img class='image' src='https://play-lh.googleusercontent.com/CWzqShf8hi-AhV9dUjzsqk2URzdIv8Vk2LmxBzf-Hc8T-oGkLVXe6pMpcXv36ofpvtc'>
                </div>
                <div class='carousel__item-words col-8'>
                  <p class='title'>Dua Lipa Concert</p>
                  <p class='body'>24 October 2022<br> 8pm to 12am</p>
                  <p class='carousel__fake-button text-center my-auto'>
                    Create a Jio
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
       

      
    </div>

    <!-- Step 2 -->
    <div class="row pb-5 reveal" style="margin-top: 15vmin">

      <div class="col-12 col-lg-6 d-flex justify-content-center order-lg-first order-last">
        <!-- replace with carousel of events?
        <img src="../assets/images/about-events.png" class="about-img" alt=""> -->

          <div class="card-swiper">
            <div class="card-groups">
              <div class="card-group" data-index="0" data-status="active">
                <div class="little-card indiv-card"></div>
                <div class="big-card indiv-card"></div>
                <div class="little-card indiv-card"></div>
                <div class="big-card indiv-card"></div>
                <div class="little-card indiv-card"></div>
                <div class="big-card indiv-card"></div>
                <div class="little-card indiv-card"></div>
                <div class="big-card indiv-card"></div>
              </div>
            </div>
          </div>
        </div>

      <div class="col-12 col-lg-6 text-center my-auto order-lg-last order-first">
        <div class="about-step-header">Filter by event</div>
        <p class="about-step-text mx-auto text-center mb-5">
          Want to attend a specific event with people? Filter the groups based on the event on our homepage and voila! 
        </p>
      </div>

    </div>

    <!-- Step 3 -->
    <div class="row reveal" style="margin-top: 15vmin">
      
      <div class="col-12 col-lg-6 text-center my-auto">
        <div class="about-step-header">Start a group</div>
        <p class="about-step-text mx-auto text-center mb-5">
          Have an activity of your own in mind? Create a 'jio' and post it to start gathering people for that Mala run!
        </p>
      </div>

      <div class="col-12 col-lg-6">
        <p class="about-img">
          <img src="../assets/images/about-create.png" class="about-img" alt="">
        </p>
      </div>

    </div>

  </div>
  <!-- how does it work section end -->

  <div class="text-center reveal">
    <router-link to="/" class="nav-link">
      <button type="button" class="btn mt-5 mb-5" id="bottom-btn">      
        <span>Get Started</span>
      </button>
    </router-link> 
  </div>

  <!-- to stop button div above from moving up or down after animation -->
  <div class="about-bottom-div"> 

  </div>

</template>

    
    <script>
    export default {
      title: 'BOJIO – About',
      mounted() {
        const renderer = this.$refs.renderer;
        const world = this.$refs.gltf.scene;
        // console.log(world)
        renderer.onBeforeRender(() => {
          if (world) world.rotation.y -= 0.007;
        });
        const orbitCtrl = this.$refs.renderer.three.cameraCtrl
        orbitCtrl.enableZoom = false;
      },
    };

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
    // else {
    //   reveals[i].classList.remove("active");
    // }
  }
}

window.addEventListener("scroll", reveal);
</script>
