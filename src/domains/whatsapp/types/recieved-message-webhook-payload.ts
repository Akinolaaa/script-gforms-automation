export type WhatsappTemplateName =
  | "bvndlebot_welcome"
  | "bvndlebot_welcome_new_user_v2"
  | "bvndlebot_welcome_ue_env"
  | "bvndlebot_verify_email"
  | "bvndlebot_create_account"
  | "bvndlebot_link_account"
  | "bvndlebot_redemption_location_prompt"
  | "bvndlebot_check_balance_prompt"
  | "bvndlebot_buy_airtime"
  | "bvndlebot_transfer_coins"
  | "bvndlebot_bvndle_deals"
  | "notification_deposit";

export interface WhatsappWebhookPayload {
  object: string; //"whatsapp_business_account"
  entry: Entry[];
}

type Entry = {
  id: string;
  changes: Change[];
};

type Change = {
  value: Value;
  field: string;
};

type Value = {
  messaging_product: string;
  metadata: Metadata;
  contacts?: Contact[];
  messages?: Message[];
};

type Contact = {
  profile: Profile;
  wa_id: string;
};

type Profile = {
  name: string;
};

type Message = BaseMessage &
  (
    | TextMessage
    | ReactionMessage
    | ButtonMessage
    | ImageMessage
    | UnknownMessage
    | StickerMessage
    | LocationMessage
    | ContactMessage
    | AdClickMessage
    | InteractiveMessage
  );

type BaseMessage = {
  from: string;
  id: string;
  timestamp: string;
  text: undefined | Text;
  identity?: Identity;
};

export type TextMessage = {
  type: "text";
  identity?: Identity;
  text: Text;
};

export type ReactionMessage = {
  type: "reaction";
  reaction: Reaction;
};

export type ButtonMessage = {
  context?: {
    // for quick reply button
    from: string;
    id: string; // "wamid.gBGGFlCGg0cvAgkLFm4e9tICiTI"
  };
  type: "button";
  button: Button;
};

export type ImageMessage = {
  type: "image";
  image: MessageImage;
};

export type UnknownMessage = {
  type: "unknown";
  errors: Error[];
};

export type StickerMessage = {
  type: "sticker";
  sticker: Sticker;
};

export type LocationMessage = {
  type: undefined;
  location: Location;
};

export type ContactMessage = {
  type: undefined;
  contacts: MessageContact;
};

export type AdClickMessage = {
  referral: Referral;
  text: Text;
  type: undefined;
};

export type InteractiveMessage = {
  type: "interactive";
  interactive: Interactive;
  context: {
    from: string; //"2348061148023"; the bot's number
    id: string;
  };
};

type Interactive =
  | {
      nfm_reply: {
        body: string; //"Sent";
        name: string; // "flow";
        response_json: string; // stringified data
      };
      type: "nfm_reply";
    }
  | {
      button_reply: {
        id: string; // "check_balance",
        title: string; // Check Balance
      };
      type: "button_reply";
    };

type Identity = {
  acknowledged: boolean;
  created_timestamp: number;
  hash: string;
};

type Button = {
  text: string;
  payload: string;
};

type Text = {
  body: string;
};

type Metadata = {
  display_phone_number: string;
  phone_number_id: string;
};

type Reaction = {
  emoji: string;
  messsage_id: string;
};

type MessageImage = {
  caption: string;
  mime_type: string;
  sha256: string;
  id: string;
};
type Sticker = {
  id: string;
  animated: boolean;
  mime_type: string;
  sha256: string;
};

type MessageContact = {
  addresses: Address[];
  birthday: string;
  emails: Email[];
  name: Name;
  org: Org;
  phones: Phone[];
  urls: URL[];
};

type Location = {
  latitude: string;
  longitude: string;
  name: string;
  address: string;
};

type Referral = {
  source_url: string;
  source_id: string;
  source_type: string;
  headline: string;
  body: string;
  media_type: string;
  image_url: string;
  video_url: string;
  thumbnail_url: string;
};

type Error = {
  code: number;
  details: string;
  title: string;
};

type Address = {
  city: string;
  country: string;
  country_code: string;
  state: string;
  street: string;
  type: string;
  zip: string;
};

type Email = {
  email: string;
  type: string;
};

type Name = {
  formatted_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  suffix: string;
  prefix: string;
};

type Org = {
  company: string;
  department: string;
  title: string;
};

type Phone = {
  phone: string;
  wa_id: string;
  type: string;
};
