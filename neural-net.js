var NueralNet = function () {

  CParams = {
      dBias: 1.0,
      dActivationResponse: 1.0
  };

  var ranClamped = function (min, max) {
    return min + Math.random() * (max - min);
  };

  var Nueron = function (inputNum) {
    var m_weigths = [];
    var m_numInputs = inputNum + 1;

    for (var i = 0 ; i < m_numInputs; i++){
      weights.push(ranClamped(-1,1)); // <-- clamped range could be a problem
    }

  };

  var NeuronLayer = function (numNuerons, numInputsPerNeuron) {

    //the number of neurons in this layer
    var m_numNeurons;

    //the layer of neurons
    var m_vecNeurons = [];

  };

  var m_NumInputs, m_NumOutputs, m_NumHiddenLayers, m_NeuronsPerHiddenLyr;



  //storage for each layer of neurons including the output layer

  /*vector<SNeuronLayer>*/
  var m_vecLayers = [];

  //have a guess... ;0)

  var CreateNet = function(){

    //create the layers of the network
  	if (m_NumHiddenLayers > 0)
  	{
  		//create first hidden layer
  	  m_vecLayers.push_back(SNeuronLayer(m_NeuronsPerHiddenLyr, m_NumInputs));

      for (var i=0; i<m_NumHiddenLayers-1; ++i)
      {

  			m_vecLayers.push(SNeuronLayer(m_NeuronsPerHiddenLyr,
                                           m_NeuronsPerHiddenLyr));
      }

      //create output layer
  	  m_vecLayers.push(SNeuronLayer(m_NumOutputs, m_NeuronsPerHiddenLyr));
  	}

    else
    {
  	  //create output layer
  	  m_vecLayers.push(SNeuronLayer(m_NumOutputs, m_NumInputs));
    }

  };



  //gets the weights from the NN

  /*vector<double>*/
  var GetWeights = function(){
    //this will hold the weights
  	var weights = [];

  	//for each layer
  	for (var i=0; i<m_NumHiddenLayers + 1; ++i)
  	{
  		//for each neuron
  		for (var j=0; j<m_vecLayers[i].m_NumNeurons; ++j)
  		{
  			//for each weight
  			for (var k=0; k<m_vecLayers[i].m_vecNeurons[j].m_NumInputs; ++k)
  			{
  				weights.push(m_vecLayers[i].m_vecNeurons[j].m_vecWeight[k]);
  			}
  		}
  	}

  	return weights;
  };



  //returns the total number of weights in the net

  /*int*/
  var GetNumberOfWeights = function(){
    var weights = 0;

  	//for each layer
  	for (var i=0; i<m_NumHiddenLayers + 1; ++i)
  	{

  		//for each neuron
  		for (var j=0; j<m_vecLayers[i].m_NumNeurons; ++j)
  		{
  			//for each weight
  			for (var k=0; k<m_vecLayers[i].m_vecNeurons[j].m_NumInputs; ++k)

  				weights++;

  		}
  	}

  	return weights;
  };



  //replaces the weights with new ones

  var PutWeights = function(/*vector<double>*/ weights){
    var cWeight = 0;

  	//for each layer
  	for (var i=0; i<m_NumHiddenLayers + 1; ++i)
  	{

  		//for each neuron
  		for (var j=0; j<m_vecLayers[i].m_NumNeurons; ++j)
  		{
  			//for each weight
  			for (var k=0; k<m_vecLayers[i].m_vecNeurons[j].m_NumInputs; ++k)
  			{
  				m_vecLayers[i].m_vecNeurons[j].m_vecWeight[k] = weights[cWeight++];
  			}
  		}
  	}

  	return;
  };



  //calculates the outputs from a set of inputs

  var Update = function(/*vector<double>*/ inputs){
     //stores the resultant outputs from each layer

    var outputs = [], cWeight=0, i=0, j=0, k=0;

    //first check that we have the correct amount of inputs

    if (inputs.length != m_NumInputs){

      //just return an empty vector if incorrect.
      return outputs;
    }

    //For each layer....

    for (i=0; i<m_NumHiddenLayers + 1; ++i){

      if ( i > 0 )
        inputs = outputs.slice();

      outputs = [];
      cWeight = 0;

      //for each neuron sum the (inputs * corresponding weights).Throw
      //the total at our sigmoid function to get the output.
      for (j=0; j<m_vecLayers[i].m_NumNeurons; ++j){

        var netinput = 0;

        var NumInputs = m_vecLayers[i].m_vecNeurons[j].m_NumInputs;

        //for each weight
        for ( k=0; k<NumInputs - 1; ++k){

          //sum the weights x inputs
          netinput += m_vecLayers[i].m_vecNeurons[j].m_vecWeight[k] * inputs[cWeight++];

        }

        //add in the bias
        netinput += m_vecLayers[i].m_vecNeurons[j].m_vecWeight[NumInputs-1] * CParams.dBias;

        //we can store the outputs from each layer as we generate them.
        //The combined activation is first filtered through the sigmoid
        //function

        outputs.push_back(Sigmoid(netinput, CParams.dActivationResponse));

        cWeight = 0;
      }

    }

    return outputs;
  };



  //sigmoid response curve

  var Sigmoid = function(/*double*/ activation, /*double*/ response){
      return ( 1 / ( 1 + Math.exp(-netinput / response)));
  };

};
