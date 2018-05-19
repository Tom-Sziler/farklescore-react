import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';


const Navbar = () => (
  <div>
    <nav>
      {(
          <div>
            <Menu>
              <Menu.Item>
                <a href="/"><h1 className="high" >High Maze Party Scorekeeper</h1></a>
              </Menu.Item>
            </Menu>
          </div>
        )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
  }
}

const mapDispatch = dispatch => {
  return {
  }
}


export default connect(mapState, mapDispatch)(Navbar)


