<template>
  <div>
    <Header></Header>
    <PageHeader :post="post"></PageHeader>
    <div class="site-content-contain">
      <div id="content" class="site-content">
        <div class="wrap">
    	    <router-view></router-view>
    	    <Aside></Aside>
        </div>
      </div>
      <SiteFooter></SiteFooter>
    </div>
    <SvgIcons></SvgIcons>
  </div>
</template>

<style>
  .fade-transition {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave {
  opacity: 0;
}
</style>



