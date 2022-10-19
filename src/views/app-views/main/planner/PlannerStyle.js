import styled from 'styled-components';

export const PlannerStyle = styled.div`
  display: flex;
  justify-content: space-between;

.controller {
  width: 45%;
}

.controller__furnitureList-furniture {
  text-align: center; 
  border: 2px solid black; 
  margin-right: 4px;
  img {
    width: 80px;
    height: 80px;
  }
}

.controller__furnitureList {
  display: flex;
  flex-wrap: nowrap;
  margin-right: 10px;
  width: 90%;
  height : 150px;
  overflow-y: auto;
}

.controller__buttonDiv {
  display: flex;
  margin-top: 150px;
  width: 90%;
  justify-content: space-between;
}

.fieldDiv {
  width: 60%;
  height : 550px;
  border-radius: 30px;
  border: 2px solid black;
  background-color: black;
}

.fieldDiv__topLine {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  h1 {
    position: relative;
    top: 20px;
    font-size: 16px;
    color: white;
  }
}

.fieldDiv__field {
  width: 90%;
  height : 80%;
  position: relative;
  border: 2px solid black;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
`;