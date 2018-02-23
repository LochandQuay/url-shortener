function hashUrl(url) {
  let hash = 0;
  if (url.length === 0) return hash;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash<<5) - hash) + char;
    hash = hash & hash;
  }

  return hash;
}

const createUrlEl = document.getElementById('create-url');
const lookupUrlEl = document.getElementById('lookup-url');
const createdUrlEl = document.getElementById('created-url');
const searchResultsEl = document.getElementById('search-results');
const errorEl = document.getElementById('error');

createUrlEl.addEventListener('submit', function(e) {
  document.getElementById('create').classList.add('hidden');
  errorEl.style.display = 'none';
  e.preventDefault();
  const url = createUrlEl.querySelector('input').value;

  if (url.length === 0) {
    errorEl.style.display = 'block';
    return;
  }

  const hashedUrl = hashUrl(url);

  localStorage.setItem(hashedUrl, url);
  createdUrlEl.innerHTML = hashedUrl;
  document.getElementById('create').classList.remove('hidden');
});

lookupUrlEl.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const hashedUrl = lookupUrlEl.querySelector('input').value;
  const url = localStorage.getItem(hashedUrl);
  
  if (url) {
    searchResultsEl.style.color = 'deepskyblue';
    searchResultsEl.innerHTML = url;
  } else {
    searchResultsEl.style.color = 'tomato';
    searchResultsEl.innerHTML = "No Match Found";
  }
  document.getElementById('lookup').classList.remove('hidden');
});