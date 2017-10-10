require 'csv'

EXPORTED_CSV_FILE_FROM_NUMBERS_APP = "/Users/rodhom/Documents/Ruby\ -\ methods\ properties/Methods-Tabla\ 1.csv"

CSV::Converters[:my_attrs] = lambda{|s|
  begin
    case s
      when 'FALSO'
        false
      when 'VERDADERO'
        true
      else
        s
    end
  rescue ArgumentError
    s
  end
}


class ExtractMethodExample

  def self.perform
    csv_options = {row_sep: :auto,
                   col_sep: ";",
                   encoding: "bom|utf-8",
                   headers: true,
                   converters: :my_attrs}

    CSV.read(EXPORTED_CSV_FILE_FROM_NUMBERS_APP, csv_options)
      .reject.with_index {|item,index| (0..2).include?(index) }
      .map(&:to_hash)
      .select {|item| item["signatureMethod"] }
      .select {|item| item["ArrayOfNumbersExample1OutputData"] }
    #TODO capture exception here
  end
end
