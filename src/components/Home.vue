<template>
  <div>
    <Header></Header>
    <PageHeader :post="post"></PageHeader>
    <div class="site-content-contain">
      <div id="content" class="site-content">
        <div class="wrap">
    	    <div class="very-changing-content">
            <transition name="fade">
              <router-view :key="$route.fullPath"></router-view>
            </transition>
          </div>
    	    <Aside></Aside>
        </div>
      </div>
      <SiteFooter></SiteFooter>
    </div>
    <SvgIcons></SvgIcons>
  </div>
</template>





