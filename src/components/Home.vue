<template>
  <div>
  	<SEO></SEO>
    <Header></Header>
    <div class="site-content-contain">
      <div id="content" class="site-content">
        <div class="wrap">
    	    <div id="primary" class="content-area">
    	    	<main id="main" class="site-main" role="main">
    	    		<router-view></router-view>	
    	    	</main>
    	    </div>
    	    <Aside></Aside>
        </div>
      </div>
      <SiteFooter></SiteFooter>
    </div>
  </div>
</template>
