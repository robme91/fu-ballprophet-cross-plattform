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
  questionInput: {
    fontSize: 14,
    minWidth: 200,
    minHeight: 50
  }
});

//TODO style textfields
