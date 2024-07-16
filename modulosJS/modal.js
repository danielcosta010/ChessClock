const modal = document.getElementById("meuModal");

export function iniciarModal(){
  const sim = document.getElementById('btn__reiniciar-modal');
  const nao = document.getElementById('btn__cancelar-modal');
  const fechar = document.getElementById("fechar__modal");
  
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
  modal.style.display = 'block';
}
