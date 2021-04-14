library(tidyverse)

setwd("/Users/keyurdesai/projects/web/powermantra/static/assets/text/json/mantras/")

mergeFiles <- function(begin, end) {
  mydir <- sprintf("onebyone/%d_%d",begin, end)
  mymergedfile <- sprintf("/merged/mantra_%d_%d.json", begin, end) 
  list.files(mydir, full.names = TRUE) -> myfilesToMerge
  
  myoutput <- NULL
  errmsg <- NULL
  for(i in begin:end) {
    myfile <- sprintf("./%s/mymantra_%d.json", mydir, i)
    mytmp <- readLines(myfile)
    if(as.integer(str_replace(str_replace(mytmp[2], "\"id\":", ""), ",", "")) != i) {
      print(errmsg <- paste("id mismtach at:", i))
      break
    } else {
      if(i == begin) {
        myoutput <- mytmp
      } else {
        myoutput <- c(myoutput, ",", mytmp)
      }
    }
    print(myfile)
  }
  print(myfilesToMerge)
  print(mymergedfile)
  
  
  if(is.null(errmsg)) {
    myoutput <- c("[", myoutput, "]")
    tibble(myoutput = myoutput) -> myoutput1
    myoutput1 %>%
      filter(trimws(myoutput)!="") -> myfinal
    print(paste("blank rows removed: ", nrow(myoutput1) - nrow(myfinal)))
    writeLines(myfinal$myoutput, paste0(".", mymergedfile))
    print(sprintf("success: created %s", paste0(".", mymergedfile)))
    finalDestination <- "../../../../../public/assets/text/json/mantras/"
    file.copy(paste0(".", mymergedfile), paste0(finalDestination, mymergedfile), overwrite = TRUE)
  }
  
  ans <- tibble(myMergedFile = mymergedfile, myTimeStamp = timestamp()) 
  return(ans)
}

#create the combine file for the items in 1_3
mergeFiles(1,3) -> addEntry
mergeFiles(4,6) -> addEntry
#create / update the .json that keeps track of the combined files
#the loadText() will use this file to keep track of what files to load
library(jsonlite)
if(!file.exists("./myFilesToLoad.json")) {
  writeLines(prettify(toJSON(addEntry)), "./myFilesToLoad.json")
  print("success: created ./myFilesToLoad.json")
} else {
fromJSON("./myFilesToLoad.json") -> myCurrentEntries
myCurrentEntries %>% 
  filter(myMergedFile != addEntry$myMergedFile) %>%
  bind_rows(addEntry) %>%
  mutate(temp = str_replace(myMergedFile, "/merged/mantra_", "")) %>% 
  mutate(temp = str_replace(temp, ".json", "")) %>%
  separate(temp, into = c("temp1", "temp2"), sep = "_") %>%
  arrange(temp1) %>%
  select(-temp1, -temp2) -> myOutput

writeLines(prettify(toJSON(myOutput)), "./myFilesToLoad.json")
print("success: updated ./myFilesToLoad.json")
}

file.copy("./myFilesToLoad.json", "../../../../../public/assets/text/json/mantras/myFilesToLoad.json", overwrite = TRUE)
