<template>
  <div>
  	<SEO></SEO>
    <Header></Header>
    <div id="content" class="site-content">
	    <div id="primary" class="content-area">
	    	<main id="main" class="site-main" role="main">
	    		<router-view></router-view>	
	    	</main>
	    </div>
	    <Aside></Aside>
    </div>
    <SiteFooter></SiteFooter>
  </div>
</template>
