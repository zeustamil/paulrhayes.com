require 'csv'
require 'date'

csv_file = "source/pulls/pulls.csv"
markdown_file = "source/pulls/index.md"
pulls = CSV.read(csv_file)

content = "title: 'Pull requests'
layout: 'page'
---

| Date | Pull request |
|--|--|
"

pulls.drop(1).each do |row|
  date = Date.parse(row[1])
  content << "| <time class=\"pr-date\" datetime=\"#{row[0]}\">#{date.strftime('%e %b %Y')}</time> | <a href=\"#{row[3]}\" class=\"pr-repo\">#{row[2]}</a> <a class=\"pr-link\"  href=\"https://github.com#{row[5]}\">#{row[4].gsub('{%', '‘').gsub('%}', '’')}</a> |\n"
end

File.open(markdown_file, 'w') do |f|
  f.write(content)
end

puts "Pull request table updated"
