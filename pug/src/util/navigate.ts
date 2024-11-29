document.addEventListener('DOMContentLoaded', () => {
  const githubLink = document.querySelector('.link-icon');
  if (githubLink) {
    githubLink.addEventListener('click', () => {
      window.location.href = 'https://github.com/lcaohoanq';
    });
  }
});