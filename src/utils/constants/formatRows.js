import bcrypt from "bcrypt";

export const formatRows = async (row) => {
  if (row[0]?.password) {
    row[0].password = await bcrypt.hash(row[0].password, 10);
  }

  if (row[0]?.pickup || row[0]?.receiver || row[0]?.paymentInfo) {
    row[0].pickup = JSON.parse(row[0].pickup);
    row[0].receiver = JSON.parse(row[0].receiver);
    row[0].paymentInfo = JSON.parse(row[0].paymentInfo);
  }

  if (row[0]?.bankAccountDetails) {
    row[0].bankAccountDetails = JSON.parse(row[0].bankAccountDetails);
  }

  if (
    row[0]?.rating ||
    row[0]?.currentLocation ||
    row[0]?.workingHours ||
    row[0]?.insuranceDetails ||
    row[0]?.documents ||
    row[0]?.availabilityCalendar
  ) {
    row[0].rating = JSON.parse(row[0].rating);
    row[0].currentLocation = JSON.parse(row[0].currentLocation);
    row[0].workingHours = JSON.parse(row[0].workingHours);
    row[0].insuranceDetails = JSON.parse(row[0].insuranceDetails);
    row[0].documents = JSON.parse(row[0].documents);
    row[0].availabilityCalendar = JSON.parse(row[0].availabilityCalendar);
  }

  return row;
};
