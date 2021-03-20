library(tidyverse)
dir("./projects/web/powermantra/static/assets/text/json/mantras/onebyone/") -> myfiles
myoutput <- NULL
errmsg <- NULL
for(i in 1:length(myfiles)) {
  mytmp <- readLines(
    sprintf("./projects/web/powermantra/static/assets/text/json//mantras/onebyone/mymantra_%d.json", i)
    )
  
  if(as.integer(str_replace(str_replace(mytmp[2], "\"id\":", ""), ",", "")) != i) {
    print(errmsg <- paste("id mismtach at:", i))
    break
  } else {
    if(i == 1) {
      myoutput <- mytmp
    } else {
    myoutput <- c(myoutput, ",", mytmp)
    }
  }
  print(i)
}
if(is.null(errmsg)) {
myoutput <- c("[", myoutput, "]")
tibble(myoutput = myoutput) -> myoutput1
myoutput1 %>%
  filter(trimws(myoutput)!="") -> myfinal
print(paste("blank rows removed: ", nrow(myoutput1) - nrow(myfinal)))
print("success: created mymantras_combined.json")
writeLines(myfinal$myoutput,"./projects/web/powermantra/static/assets/text/json/mantras/mymantras_combined.json")
}

