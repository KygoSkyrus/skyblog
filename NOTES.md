## GATHERING
- in mongoose on every update deleet or any query await must be used or elese it wont work


## CONVERSION UPDATE (mySQL -> Mongo)
- userblog apis are not fixed..
- image upload might be a problem,
- google sign in is not working
- prev and next are now owrkibg,,acyually ealier is was increment and decrementing of these two,,now have to add a new field in db which will increment when new documnet is inserted :: have toun commnet pre v and next from html file also,,blog-details.ejs
- blog edit is not working,,gotta fix the image upload syustem,,either user gridfs or a cloud storage
- hav to add response tpo all the mongodb queries.let user know if its failing or passing


NOTE::
- i tried uploading images to cloudinary,,this was successful,,was able to upoload and retrive teh image by the link,,yet the problem was it had storage limit of 25MB only,,so i tried using firebase storage(1GB),,
- i went for firebase-admin,,,this is for server,,,but the problem here is that we need the full pathname in order to upload image,,,when the image is sent to nodejs from fontend,,it has the path i think but to deal with images(multipart data) we need multer and multer defined a destination,,,due to whihcthe image's orignal path gets overrriddern and now we havew new path,,,,and we cannot give this new path to cloud,,the file wont, get uploded,,,so now im reverting back to frontend,,where ill uploAD TH the iomage from freontend and send the image url to backend along with other nlog data to be stored in db

## todo
- add loader when like when the admin posts a blog bcz there it waits 4 sec for summernote
- fix category lowercase issue {it should be either in lowercase or uppercase}