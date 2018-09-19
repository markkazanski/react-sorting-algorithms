import React, { Component } from 'react';
import './App.css';
import { swap, indexOfMinimum, insert, merge, randomIntFromInterval, partition, isSorted } from '../helpers';
//666, 5, 999, 4, 3, 500, 1, 350, 2, 800, 6, 100
class App extends Component {
  state = {
    speed: 500,
    selectionSortArray: [],
    selectionSteps: 0,
    selectionCounter: null,
    selectionCounter2: null,
    insertionSortArray: [],
    insertionSteps: 0,
    insertionCounter: null,
    insertionCounter2: null,
    mergeSortArray: [],
    mergeSteps: 0,
    mergeCounter: null,
    mergeCounter2: null,
    mergeCounter3: null,

    bubbleSortArray: [],
    bubbleSorted: false,
    bubbleCounter: null,
    bubbleSteps: 0,

    quickSortArray: [],
    quickCounter: null, 
    quickCounter2: null, 
    quickCounter3: null, 
    quickSteps: 0
  }
//bg-success
  componentDidMount(){
    const newArray = [];
    for(let i=0; i<50; i++){
      newArray.push(randomIntFromInterval(0, 100));
    }

    this.state.selectionSortArray = [];
    this.state.insertionSortArray = [];
    this.state.mergeSortArray = [];
    this.state.selectionSortSteps = 0,
    this.state.insertionSortSteps= 0,
    this.state.mergeSortSteps= 0;
    this.state.selectionCounter = 0;
    this.state.selectionCounter2 = 0;
    this.state.insertionCounter = 0;
    this.state.insertionCounter2 = 0;
    this.state.mergeCounter = 0;
    this.state.mergeCounter2 = 0;
    this.state.mergeCounter3 = 0;
    this.state.bubbleCounter = 0;
    this.state.quickCounter = 0;
    this.state.quickCounter2 = 1;
    this.state.quickCounter3 = newArray.length - 1;

    newArray.forEach(x => {
      this.state.selectionSortArray.push(x);
      this.state.insertionSortArray.push(x);
      this.state.mergeSortArray.push(x);
      this.state.bubbleSortArray.push(x);
      this.state.quickSortArray.push(x);
    })
    
    
    this.setState(() => ({
      selectionSortArray: this.state.selectionSortArray,
      insertionSortArray: this.state.insertionSortArray,
      mergeSortArray: this.state.mergeSortArray,
      bubbleSortArray: this.state.bubbleSortArray,
      quickSortArray: this.state.quickSortArray,
      selectionSortSteps: 0,
      insertionSortSteps: 0,
      mergeSortSteps: 0
    }), () => console.log("componentDidMount"));

  }

  selectionSortSteps = (i) => {
    let array = this.state.selectionSortArray;
    if(i < array.length){
        const min = indexOfMinimum(array, i);
        //console.log('min',)
        
        this.setState({selectionCounter: i, selectionCounter2: min}, () => swap(array, i, min));
        
        setTimeout(() => this.setState({
          selectionSortArray: array,
          selectionSteps: this.state.selectionSteps + 1
        }, () => this.selectionSortSteps(i + 1)), this.state.speed);
    }
  };

  insertionSortSteps = (x) => {
    let array = this.state.insertionSortArray;
    if(x < array.length - 1){
        const j = insert(array, x, array[x+1]);
        this.setState({insertionCounter: x, insertionCounter2: j});
        setTimeout(() => this.setState({
          insertionSortArray: array,
          insertionSteps: this.state.insertionSteps + 1
        }, () => this.insertionSortSteps(x + 1)), this.state.speed )
    }
  };

  bubbleSortSteps(){
    let arr = this.state.bubbleSortArray;
    let sorted = this.state.bubbleSorted;

    if(!sorted) {
      sorted = true
      for(var i=0; i < arr.length; i++) {
        if(arr[i] < arr[i-1]) {

          swap(arr, i-1, i);
          this.setState({bubbleCounter: i});
          sorted = false;
        }
      }
      if(!sorted)
        setTimeout(() => this.setState({bubbleSteps: this.state.bubbleSteps + 1}, () => this.bubbleSortSteps()), this.state.speed);
    }
  }

  mergeSortSteps = (p, r) => {
    let array = this.state.mergeSortArray;
    
    //console.log('r', r, 'p', p);
    if(r-p >= 1 && !isSorted(array)){
        setTimeout(() => this.setState({ mergeSteps: this.state.mergeSteps + 1 }), this.state.speed );
        let q = Math.floor((r + p) / 2);
        //this.setState({mergeCounter: p, mergeCounter2: q, mergeCounter3: r});
        this.mergeSortSteps(p, q);
        this.mergeSortSteps(q+1, r);
        setTimeout(() => this.setState({
          mergeSortArray: array,
          mergeCounter: p, mergeCounter2: q, mergeCounter3: r
        }, () => {
          merge(array, p, q, r);
        }), this.state.speed);
    } 
  };

  quickSortSteps = (p, r) => {
    let array = this.state.quickSortArray;
    if(1 <= r-p){
        var q = partition(array, p, r);
        console.log('q: ', q);
        setTimeout( () => this.setState({
          quickSortArray: array,
          quickSteps: this.state.quickSteps + 1, 
          quickCounter: p,
          quickCounter2: q,
          quickCounter3: r
        }, () => { this.quickSortSteps(p, q-1); this.quickSortSteps(q+1, r); }), this.state.speed ); 
    }
  };

  sort = () => {
    this.insertionSortSteps(0);
    this.selectionSortSteps(0);
    this.mergeSortSteps(0, this.state.mergeSortArray.length - 1);
    this.bubbleSortSteps();
    this.quickSortSteps(0, this.state.quickSortArray.length-1);
  }

  render() {
    return (
      <div className="App container-fluid">
        <div class='row'>
          <div class='col-sm'>
            <p>Selection Sort - Steps: {this.state.selectionSteps}</p>
              {this.state.selectionSortArray.map((num, i) => 
                <div className='progress'><div style={{width: num + '%'}} 
                  className={
                    ('progress-bar ') + 
                    (this.state.selectionCounter === i ? ' bg-info ' : null) + 
                    (this.state.selectionCounter2 === i ? ' bg-success ' : null)
                  } key={'sel' + num}>{num}</div></div>
                )}
          </div>

          <div class='col-sm'>
            <p>Insertion Sort - Steps: {this.state.insertionSteps}</p>
            <ul>
              {this.state.insertionSortArray.map((num, i) => 
                <div className='progress'><div style={{width: num + '%'}} 
                  className={
                    ('progress-bar ') + 
                    (this.state.insertionCounter2 === i ? ' bg-info ' : null) + 
                    (this.state.insertionCounter === i ? ' bg-success ' : null)
                  } key={'sel' + num}>{num}</div></div>
                )}
            </ul>
          </div>

          <div class='col-sm'>
            <p>Merge Sort - Steps: {this.state.mergeSteps}</p>
            <ul>
              {this.state.mergeSortArray.map((num, i) => 
                <div className='progress'><div style={{width: num + '%'}} 
                  className={
                    ('progress-bar ') + 
                    (this.state.mergeCounter === i ? ' bg-info ' : null) + 
                    (this.state.mergeCounter2 === i ? ' bg-success ' : null) + 
                    (this.state.mergeCounter3 === i ? ' bg-warning ' : null)
                  } key={'sel' + num}>{num}</div></div>
              )}
            </ul>
          </div>

          <div class='col-sm'>
            <p>Bubble Sort - Steps: {this.state.bubbleSteps}</p>
            <ul>
              {this.state.bubbleSortArray.map((num, i) => 
                <div className='progress'><div style={{width: num + '%'}} 
                  className={
                    ('progress-bar ') + 
                    (this.state.bubbleCounter === i ? ' bg-info ' : null) + 
                    (this.state.bubbleCounter === i + 1 ? ' bg-success ' : null)
                  } key={'sel' + num}>{num}</div></div>
                )}
            </ul>
          </div>

          <div class='col-sm'>
            <p>Quick Sort - Steps: {this.state.quickSteps}</p>
            <ul>
              {this.state.quickSortArray.map((num, i) => 
                <div className='progress'><div style={{width: num + '%'}} 
                  className={
                    ('progress-bar ') + 
                    (this.state.quickCounter === i ? ' bg-info ' : null) + 
                    (this.state.quickCounter2 === i ? ' bg-warning ' : null) + 
                    (this.state.quickCounter3 === i ? ' bg-success ' : null)
                  } key={'qui' + num}>{num}</div></div>
                )}
            </ul>
          </div>
        </div>
        <div class='row center-text'>
          <p class='text-center'><button className='btn-primary' onClick={this.sort} disabled={this.state.selectionSteps !== 0}>Sort</button></p>

          <p class='text-center'><button onClick={() => this.componentDidMount()}>Reload</button></p>
        </div>
      </div>
    );
  }
}

export default App;

/*
  COMPONENTS

  Algorithm
    sorting function
    List to sort
      List item
  
*/
