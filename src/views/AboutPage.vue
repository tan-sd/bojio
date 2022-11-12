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

  <div class="container about-fadeup world-model">
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
      <div class="">
        the <i>three</i> main ways to use our platform
      </div>
      
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
        <div class='wrapper col col-lg-6'>
          <div class='carousel'>
            <div v-for="item in objects" :key="item" class='carousel__item container'>
              <div class='carousel__item-body row'>
                <div class='carousel__item-image-div col-5'>
                  <img class='image' :src=item.image>
                </div>
                <div class='carousel__item-words col-7 ps-5 my-auto'>
                  <div class='carousel-title'>{{item.title}}</div>
                  <div class="carousel-creator"><i class="bi bi-person-circle" style="margin-right: 10px"></i>{{item.creator}}</div>
                  <div class='carousel-details'><i class="bi bi-calendar2-week-fill" style="margin-right: 10px"></i>{{item.details}}</div>
                  <div class="carousel-venue"><i class="bi bi-geo-alt-fill" style="margin-right: 10px"></i>{{item.venue}}</div>
                  <div class='carousel__fake-button text-center my-auto mt-2'>Join Jio</div>
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
          <img src="../../public/Images/about-create.png" class="about-img" alt="">
        </p>
      </div>

    </div>

  </div>
  <!-- how does it work section end -->

  <div class="text-center reveal">
    <router-link to="/" @click="scrollToTop" class="nav-link">
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
      name: 'aboutpage',
      title: 'BOJIO – About',

      data(){
          return {
            objects : [
              {
                title:'Dua Lipa Concert',
                venue: 'The Star Theatre',
                image: require('../../public/Images/carousel/dua_lipa.jpg'),
                details: 'Sun, Nov 27, 8 PM',
                creator: 'joelzxc',
              },

              {
                title:'Picnic',
                venue: 'Changi Beach',
                image: require('../../public/Images/carousel/changi_beach.jpg'),
                details: 'Thu, Dec 15, 1 PM',
                creator: 'boonkeng123'
              },

              {
                title:'Kite Flying',
                venue: 'Marina Barrage',
                image: require('../../public/Images/carousel/marina_barrage.jpg'),
                details: 'Wed, Nov 30, 10 AM',
                creator: 'sethyuppie'
              },

              {
                title:'Standup Comedy',
                venue: 'Robertson Quay',
                image: require('../../public/Images/carousel/robertson_quay.jpg'),
                details: 'Thu, Dec 8, 8 PM',
                creator: 'fuzzywuzzy'
              },

              {
                title:'Christmas Party',
                venue: 'Choa Chu Kang',
                image: require('../../public/Images/carousel/christmas_party.jpg'),
                details: 'Sat, Dec 24, 12 PM',
                creator: 'taylor2224'
              }
            ]
          }

      },
      methods: {
        scrollToTop() {
            window.scrollTo(0,0);
          },
      },
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
