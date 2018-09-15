import React, { Component } from 'react';
import './App.css';
import { swap, indexOfMinimum, insert, merge } from '../helpers';

class App extends Component {
  state = {
    speed: 1000,
    selectionSortArray: [666, 5, 999, 4, 3, 500, 1, 350, 2, 800, 6, 100],
    selectionSteps: 0,
    insertionSortArray: [666, 5, 999, 4, 3, 500, 1, 350, 2, 800, 6, 100],
    insertionSteps: 0,
    mergeSortArray: [666, 5, 999, 4, 3, 500, 1, 350, 2, 800, 6, 100],
    mergeSteps: 0
  }

  selectionSortSteps = (i) => {
    let array = this.state.selectionSortArray;
    if(i < array.length){
        swap(array, i, indexOfMinimum(array, i));     
        setTimeout(() => this.setState({
          selectionSortArray: array,
          selectionSteps: this.state.selectionSteps + 1
        }, () => this.selectionSortSteps(i + 1)), this.state.speed);
    }
  };

  insertionSortSteps = (x) => {
    let array = this.state.insertionSortArray;
    if(x < array.length - 1){
        insert(array, x, array[x+1]);
        setTimeout(() => this.setState({
          insertionSortArray: array,
          insertionSteps: this.state.insertionSteps + 1
        }, () => this.insertionSortSteps(x + 1)), this.state.speed )
    }
  };

  mergeSortSteps = (p, r) => {
    let array = this.state.mergeSortArray;
    console.log('r', r, 'p', p);
    if(r-p >= 1){
        setTimeout(() => this.setState({ mergeSteps: this.state.mergeSteps + 1 }, () => console.log("merge steps", this.state.mergeSteps)), this.state.speed );
        let q = Math.floor((r + p) / 2);
        this.mergeSortSteps(p, q);
        this.mergeSortSteps(q+1, r);
        setTimeout(() => this.setState({
          mergeSortArray: array
        }, () => merge(array, p, q, r)), this.state.speed);
    } 
  };

sort = () => {
  this.insertionSortSteps(0);
  this.selectionSortSteps(0);
  this.mergeSortSteps(0, this.state.mergeSortArray.length - 1);
}

  render() {
    return (
      <div className="App">
        <p>Selection Sort - Steps: {this.state.selectionSteps}</p>
        <ul>
          {this.state.selectionSortArray.map(num => <li key={'sel' + num}>{num}</li>)}
        </ul>

        <p>Insertion Sort - Steps: {this.state.insertionSteps}</p>
        <ul>
          {this.state.insertionSortArray.map(num => <li key={'ins' + num}>{num}</li>)}
        </ul>

        <p>Merge Sort - Steps: {this.state.mergeSteps}</p>
        <ul>
          {this.state.mergeSortArray.map(num => <li key={'mrg' + num}>{num}</li>)}
        </ul>

        <p>Bubble Sort...</p>
        <button onClick={this.sort} disabled={this.state.selectionSteps !== 0}>Sort</button>
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
