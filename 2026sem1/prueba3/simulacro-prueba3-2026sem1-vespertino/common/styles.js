import { StyleSheet } from "react-native";

const baseButton = {
  paddingHorizontal: 30,
  paddingVertical: 15,
  borderRadius: 8,
  marginBottom: 15,
};

export const styles = StyleSheet.create({
  primaryButton: {
    ...baseButton,
    backgroundColor: '#000099',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  secondaryButton: {
    ...baseButton,
    backgroundColor: '#0088ff',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  flagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 20,
  },
  flagGridItem: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 10,
    width: '28%',
  },
  flagGridItemSelected: {
    backgroundColor: '#ffee77',
  },
  flagImage: {
    width: 50,
    height: 30,
  },
});
