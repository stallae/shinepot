import {
  VideoCamera,
  Image,
  Microphone,
  TextT,
  type Icon,
} from 'phosphor-react-native';

export interface ContentType {
  id: string;
  label: string;
  icon: Icon;
}

export const CONTENT_TYPES: ContentType[] = [
  {
    id: 'video',
    label: 'Video',
    icon: VideoCamera,
  },
  {
    id: 'image',
    label: 'Image',
    icon: Image,
  },
  {
    id: 'audio',
    label: 'Audio',
    icon: Microphone,
  },
  {
    id: 'text',
    label: 'Text',
    icon: TextT,
  },
];

