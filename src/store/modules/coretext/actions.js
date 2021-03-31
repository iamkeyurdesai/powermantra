import axios from 'axios';

const loadText = function ({ commit }) {
  const ax = axios.create({
    baseURL: '/assets/text/json/mantras/'
    //baseURL: 'https://powermantra.web.app/assets/text/json/mantras/'
  })
  
  ax.get('myFilesToLoad.json', { crossdomain: true }).then((response) => {
    commit('setText', { list: response.data, id: "myFilesToLoad" })
  }, (err) => {
    console.log(err)
  }).then(() => {
    let tmp = this.state.coretext.myFilesToLoad
    let i;
    for (i = 0; i < tmp.length; i++) {
      ax.get(tmp[i].myMergedFile, { crossdomain: true }).then((response) => {
        if (i == 0) {
          this.state.coretext.mantras.push(response.data)
        } else {
          let j;
          for (j = 0; j < response.data.length; j++) {
            this.state.coretext.mantras.push(response.data[j])
          }
        }
      }
      )
    }
  }).then(() => {
    // console.log(this.state.coretext.mantras)
  });
};

export default {
  loadText,
};
