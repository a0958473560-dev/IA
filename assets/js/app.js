const body = document.body;
const themeToggle = document.querySelector('#themeToggle');
const preferredTheme = localStorage.getItem('codecraft-theme');

if (preferredTheme === 'light') body.classList.add('light-theme');
themeToggle.textContent = body.classList.contains('light-theme') ? '◐' : '☀︎';

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  const isLight = body.classList.contains('light-theme');
  localStorage.setItem('codecraft-theme', isLight ? 'light' : 'dark');
  themeToggle.textContent = isLight ? '◐' : '☀︎';
});

const searchInput = document.querySelector('#articleSearch');
const articles = [...document.querySelectorAll('.article-row')];
const emptyState = document.querySelector('#emptyState');

searchInput.addEventListener('input', ({ target }) => {
  const query = target.value.trim().toLowerCase();
  let visible = 0;
  articles.forEach((article) => {
    const matches = article.textContent.toLowerCase().includes(query) || article.dataset.keywords.includes(query);
    article.classList.toggle('d-none', !matches);
    if (matches) visible += 1;
  });
  emptyState.classList.toggle('d-none', visible !== 0);
});

document.querySelectorAll('.copy-btn').forEach((button) => {
  button.addEventListener('click', async () => {
    const source = document.querySelector(`#${button.dataset.copyTarget}`).innerText;
    try {
      await navigator.clipboard.writeText(source);
      button.textContent = '已複製';
      setTimeout(() => { button.textContent = '複製'; }, 1500);
    } catch {
      button.textContent = '請手動複製';
    }
  });
});
