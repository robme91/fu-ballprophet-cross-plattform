import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  game: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  userInputs: {
    fontSize: 16,
    minWidth: 100,
    minHeight: 50
  },
  scoreInputs: {
    fontSize: 16,
    minWidth: 50,
    minHeight: 50
  },
  questionInput: {
    fontSize: 14,
    minWidth: 200,
    minHeight: 50
  },
  gameDayPickerContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBackground:{
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper:{
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  listItem: {
  padding: 10,
  fontSize: 18,
  height: 44,
  },
});
