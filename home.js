

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem('java_progress')) || {};
  } catch (e) {
    return {};
  }
}

var progress = getProgress();
var grid = document.getElementById('topicGrid');

var arrow =
  '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
  'stroke-width="3" aria-hidden="true">' +
  '<polyline points="9 5 16 12 9 19"></polyline></svg>';

for (var i = 0; i < window.TOPICS.length; i++) {
  var t = window.TOPICS[i];

  var doneList = progress[t.slug] || [];
  var done = doneList.length;
  var percent = 0;
  if (t.count > 0) {
    percent = Math.round(done * 100 / t.count);
    if (percent > 100) percent = 100;
  }

  var countText = 'Programs coming soon';
  if (t.count > 0) countText = t.count + ' programs';

  var statusText = 'Not started';
  var isActive = false;
  if (t.count > 0 && done > 0) {
    if (done >= t.count) {
      statusText = 'All done';
    } else {
      statusText = done + '/' + t.count + ' copied';
    }
    isActive = true;
  }

  var card = document.createElement('a');
  card.className = 'card';
  card.href = t.page;
  card.innerHTML =
    '<div class="card-top"><h2></h2>' + arrow + '</div>' +
    '<div class="count"></div>' +
    '<div class="bar"><i style="width:' + percent + '%"></i></div>' +
    '<div class="status' + (isActive ? ' active' : '') + '"></div>';

  card.querySelector('h2').textContent = t.name;
  card.querySelector('.count').textContent = countText;
  card.querySelector('.status').textContent = statusText;

  grid.appendChild(card);
}