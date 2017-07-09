(function() {
  window.onload = () => {
    setupListeners();
    requestUpdate();
  };

  function setupListeners() {
    window.onkeyup = (e) => {
      if (e.key === 'e' || e.key === 'E') {
        vote('evan');
      } else if (e.key === 'm' || e.key === 'M') {
        vote('mike');
      }
    };
  }

  function vote(name) {
    fetch(`/vote/${name}`, {
      method: 'POST',
    }).then((res) => {
      if (!res.ok) {
        console.error('Error voting');
        return;
      }
      return res.json().then((data) => {
        updateContestants(data);
      });
    });
  }

  function requestUpdate() {
    fetch('/voteShare', {
      method: 'GET',
    }).then((res) => {
      if (!res.ok) {
        console.error('Error getting votes');
        return;
      }
      return res.json().then((data) => {
        updateContestants(data);
      });
    });
  }

  function updateContestants(voteShare) {
    const CONTESTANT_HEIGHT = 455;

    for (const name in voteShare) {
      const contestant = document.getElementById(name)

      const percentage = voteShare[name];
      const inversePercentage = 100 - percentage;
      const heightVariation = CONTESTANT_HEIGHT * (inversePercentage / 100);

      if (percentage > 50) {
        contestant.classList.add('winning');
      } else {
        contestant.classList.remove('winning');
      }

      contestant.style.top = `calc(${inversePercentage}% - ${heightVariation}px)`;

      const displayPercentage = percentage.toFixed(1);
      contestant.getElementsByClassName('count')[0].innerHTML = displayPercentage;
    }
  }
})();
