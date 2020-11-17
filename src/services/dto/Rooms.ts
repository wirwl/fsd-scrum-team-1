type IRoomRules = {
  petsAllowed: boolean;
  smokingAllowed: boolean;
  guestAllowed: boolean;
};

type IRoomAccessibility = {
  wideCorridor: boolean;
  assistantForDisabled: boolean;
};

type IRoomExtraConvenience = {
  breakfast: boolean;
  desk: boolean;
  feedingChair: boolean;
  smallBad: boolean;
  tv: boolean;
  shampoo: boolean;
};

type IRoomImpressions = {
  perfectly: number;
  good: number;
  satisfactorily: number;
  bad: number;
};

type IRoomCommentAuthor = {
  avatar: string;
  name: string;
};

type IRoomComment = {
  date: Date;
  likes: number;
  text: string;
  author: IRoomCommentAuthor;
};

type IRoomInformation = 'comfort' | 'convenience' | 'cozy';

type IRoom = {
  id: string;
  roomNumber: number;
  bed: number;
  childBed: number;
  rules: IRoomRules,
  accessibility: IRoomAccessibility;
  bedroom: number;
  bathroom: number;
  extraConvenience: IRoomExtraConvenience;
  isLux: boolean;
  picsPreview: string[];
  pics: string[];

  price: number;
  feeForService: number;
  feeForAdditionalService: number;
  discount: number;

  rate: number;
  roomInformation: IRoomInformation[];
  impressions: IRoomImpressions,
  comments: IRoomComment[]
};

export type {
  IRoom,
  IRoomRules,
  IRoomAccessibility,
  IRoomExtraConvenience,
  IRoomImpressions,
  IRoomComment,
  IRoomCommentAuthor,
  IRoomInformation,
};
