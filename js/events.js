// ============================================================
//  EVENTS PAGE — Filter functionality
// ============================================================

function filterEvents(category) {
  const cards    = document.querySelectorAll('.event-full-card');
  const buttons  = document.querySelectorAll('.qa-card');
  const noEvents = document.getElementById('noEvents');
  const countEl  = document.getElementById('eventCount');

  // Update active filter button
  buttons.forEach(btn => {
    btn.classList.toggle('active-filter', btn.getAttribute('data-filter') === category);
  });

  // Filter cards
  let visible = 0;
  cards.forEach(card => {
    const match = category === 'all' || card.getAttribute('data-category') === category;
    card.classList.toggle('hidden', !match);
    if (match) visible++;
  });

  // Update count
  if (countEl) countEl.textContent = visible;

  // Show/hide no results message
  if (noEvents) noEvents.style.display = visible === 0 ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.qa-card[data-filter]');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterEvents(btn.getAttribute('data-filter'));
    });
  });
});