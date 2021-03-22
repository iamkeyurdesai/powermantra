
<template>
  <div class="ma-2">
    <v-btn @click="trainLoad()" >loadmodel</v-btn>  
    <v-btn v-for="item in vocabulary" :key="item" @click="trainCollect(item)">{{item}}</v-btn>
    <v-btn @click="trainFit()" >fitmodel</v-btn>  
    <v-btn @click="testListen()" >testlisten</v-btn>  
  </div>
</template>


<script>
import * as tf from '@tensorflow/tfjs';
import * as speechCommands from '@tensorflow-models/speech-commands'
export default {
  data () {
    return {
        vocabulary: ["om", "svaha", "namah"],
        baseRecognizer: null,
        transferRecognizer: null
    }
  },
  methods: {
    async trainLoad() {
// const baseRecognizer = speechCommands.create('BROWSER_FFT');
// await this.baseRecognizer.ensureModelLoaded();
this.baseRecognizer = speechCommands.create('BROWSER_FFT');
await this.baseRecognizer.ensureModelLoaded();

// Each instance of speech-command recognizer supports multiple
// transfer-learning models, each of which can be trained for a different
// new vocabulary.
// Therefore we give a name to the transfer-learning model we are about to
// train ('colors' in this case).
this.transferRecognizer = this.baseRecognizer.createTransfer('intonations');

    },
    async trainCollect(val) {
// Call `collectExample()` to collect a number of audio examples
// via WebAudio.
await this.transferRecognizer.collectExample(val);
// Don't forget to collect some background-noise examples, so that the
// trasnfer-learned model will be able to detect moments of silence.
await this.transferRecognizer.collectExample('_background_noise_');

// You can check the counts of examples for different words that have been
// collect for this transfer-learning model.
console.log(this.transferRecognizer.countExamples());
// e.g., {'red': 2, 'green': 2', 'blue': 2, '_background_noise': 2};
    },
async trainFit() {
// Start training of the transfer-learning model.
// You can specify `epochs` (number of training epochs) and `callback`
// (the Model.fit callback to use during training), among other configuration
// fields.
await this.transferRecognizer.train({
  epochs: 25,
  callback: {
    onEpochEnd: async (epoch, logs) => {
      console.log(`Epoch ${epoch}: loss=${logs.loss}, accuracy=${logs.acc}`);
    }
  }
});
console.log('done training');
},
async testListen() {
// After the transfer learning completes, you can start online streaming
// recognition using the new model.
await this.transferRecognizer.listen(result => {
  // - result.scores contains the scores for the new vocabulary, which
  //   can be checked with:
  const words = this.transferRecognizer.wordLabels();
  // `result.scores` contains the scores for the new words, not the original
  // words.
  const indexOfMaxValue = result.scores.indexOf(Math.max(...result.scores));
  console.log(words[indexOfMaxValue])
  //console.log(result)
  for (let i = 0; i < words; ++i) {
    console.log(`score for word '${words[i]}' = ${result.scores[i]}`);
  }
}, {probabilityThreshold: 0.5,
overlapFactor: 0.4});

// Stop the recognition in 10 seconds.
setTimeout(() => this.transferRecognizer.stopListening(), 1000e3);
    },
    predict() {
      // Use the model to do inference on a data point the model hasn't seen before:
      this.predictedValue = this.model.predict(tf.tensor2d([this.valueToPredict], [1, 1])).get(0, 0);
    }
  }
}
</script>
 <style lang="scss" scoped>
</style>
