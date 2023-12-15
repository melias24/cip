import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.*;
import java.util.*;


public class DuplicateRemoval {
    public static void main(String[] args) {

        String inputFile = "merged_data.csv";
        String outputFile = "output.csv";
        String duplicatesFile = "duplicate.csv"; //A file to confirm flagged duplicates 

        //I split the merged file using a cutoff file to determine which data source an entry came from since 
        //we only want to compare data entries from different sources
        int cutoffLine = 1423; // Set the cutoff line number
        List<String[]> firstDataSource = new ArrayList<>();
        List<String[]> secondDataSource = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(inputFile));
             BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile));
             BufferedWriter duplicatesWriter = new BufferedWriter(new FileWriter(duplicatesFile))) {

            String line;
            int lineNumber = 0;
            while ((line = reader.readLine()) != null) {
                lineNumber++;
                String[] columns = line.split(","); 

                if (lineNumber <= cutoffLine) {
                    firstDataSource.add(columns);
                } else {
                    if (columns.length >= 3) {
                        int duplicateIndex = findDuplicateIndex(firstDataSource, columns[1].trim(), columns[3].trim(), columns[6].trim());
                        if (duplicateIndex != -1) {
                            // Write duplicate entries to duplicates file
                            duplicatesWriter.write(String.join(",", firstDataSource.get(duplicateIndex)));
                            duplicatesWriter.newLine();
                            duplicatesWriter.write(String.join(",", columns));
                            duplicatesWriter.newLine();

                            firstDataSource.remove(duplicateIndex); // Remove duplicate from the first data source
                        }
                        secondDataSource.add(columns);
                        writer.write(line);
                        writer.newLine();
                    }
                }
            }

            // write remaining entries from the first data source to the output file
            for (String[] entry : firstDataSource) {
                writer.write(String.join(",", entry));
                writer.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }



    }

    //If the name of the investment company,the year, and country are the same, we mark it as a duplicate entry
    private static int findDuplicateIndex(List<String[]> dataSource, String name, String year, String country) {
        for (int i = 0; i < dataSource.size(); i++) {
            String[] entry = dataSource.get(i);
            // Use findDuplicateName for comparing names
            if (findDuplicateName(entry[1], name) && entry[3].equals(year) && entry[6].equals(country)) {
                return i; // Return the index of the duplicate entry
            }
        }
        return -1; // No duplicate found
    }

    private static boolean findDuplicateName(String name1, String name2) {
        return name1.contains(name2) || name2.contains(name1);
    }
}




