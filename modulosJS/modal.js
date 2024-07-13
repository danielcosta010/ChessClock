const modal = document.getElementById("myModal");

export function iniciarModal(){
  const sim = document.getElementById('restart-btn-modal')
  const nao = document.getElementById('cancel-btn-modal')
  const fechar = document.getElementById("close__modal");
  
  sim.addEventListener('click', () => {
      window.location.reload()
      modal.style.display = "none";
  })
  nao.addEventListener('click', () => {
      modal.style.display = "none";
  })
   
  fechar.addEventListener('click', () => {
      modal.style.display = "none";
  })
  
  window.addEventListener('click', () => {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  })

}

export function mostrarModal(){
  modal.style.display = 'block'
}
