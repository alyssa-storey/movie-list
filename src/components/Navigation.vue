<template>
  <nav class="nav-bar">
    <router-link to="/watch" class="nav-btn">Watch List</router-link>
    <router-link to="/favorites" class="nav-btn">Favorite Movies</router-link>
  </nav>
</template>


<style scoped>
.nav-bar {
  display: flex;
  justify-content: flex-end;
  background-color: #919151;
  padding: 12px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  align-items: center;
  padding: 0 20px;
}

/*Styling on hover */
/*Styling on active */

a {
  border-radius: 5px;
  background-color: #919151;
  font-size: 18px;
  margin: 4px;
  padding: 8px 16px;
  font: Oxygen, sans-serif;
  border: 2px solid #400036;
  color: white;
}

a.hover,
a:active,
a.active {
  border-color: #ff81d0;
}

.nav-btn + .nav-btn {
  margin-left: 8px;
}
.nav-btn {
  background-color: #400036;
}
</style>