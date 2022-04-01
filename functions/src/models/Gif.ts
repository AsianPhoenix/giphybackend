import { ObjectId } from "mongodb";

interface Original {
  url: string;
}

interface Images {
  original: Original;
}

export default interface Gif {
  _id?: ObjectId;
  id: string;
  title: string;
  username: string;
  import_datetime: string;
  url: string;
  images: Images;
}
