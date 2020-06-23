import React, {
  Component
} from 'react';
import './App.css';
import Projects from './Components/Projects';
import Todos from './Components/Todos';
import AddProject from './Components/AddProject';
import uuid from 'uuid';
import $ from 'jquery';

class App extends Component {

  constructor() {
    super();
    //init the state
    this.state = {
      projects: [],
      todos: []
    }
  }

  getTodos() {
    //use jquery here for ajax call
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/todos",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({
            todos: data
          },
          function () { //callback fucntion 
            console.log(this.state);
          });

      }.bind(this),
      error: function (error) {
        console.log("Error Occurred");
      }
    });
  }

  getProjects() {
    //hardcoded list.
    this.setState({
      projects: [{
          id: uuid.v4(),
          title: 'Business Website',
          category: 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          id: uuid.v4(),
          title: 'ECommerce shopping cart',
          category: 'Web Development'
        }
      ]
    });
  }
  //use this to populate data  the state
  componentWillMount() {
    this.getTodos();
    this.getProjects();
  }

  componentDidMount() {
    this.getTodos();
    this.getProjects();
  }

  handleAddProject(project) {
    let stateProjects = this.state.projects;
    stateProjects.push(project);
    this.setState({
      projects: stateProjects
    });
  }


  handleDeleteProject(projectId) {
    let stateProjects = this.state.projects;
    let index = stateProjects.findIndex(x => x.id === projectId)
    stateProjects.splice(index, 1);
    this.setState({
      projects: stateProjects
    });
  }


  render() {
    return ( 
      <div className = "App" >
      <AddProject addProject = { this.handleAddProject.bind(this)}/> 
      <Projects projects = {this.state.projects} onDelete = {this.handleDeleteProject.bind(this)}/>
      <hr />
      <Todos todos={this.state.todos} />
     </div >
    );
  }
}

export default App;