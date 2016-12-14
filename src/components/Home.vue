<template>
  <div>
  	<SEO></SEO>
    <Header></Header>
    <div id="content" class="site-content">
	    <div id="primary" class="content-area">
	    	<router-view></router-view>
	    </div>
	    <Aside>
    	</Aside>
    </div>
    <SiteFooter></SiteFooter>
  </div>
</template>
