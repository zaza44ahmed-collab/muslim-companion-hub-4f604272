export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      daily_quotes: {
        Row: {
          created_at: string
          id: string
          quote_date: string
          quotes: Json
        }
        Insert: {
          created_at?: string
          id?: string
          quote_date: string
          quotes: Json
        }
        Update: {
          created_at?: string
          id?: string
          quote_date?: string
          quotes?: Json
        }
        Relationships: []
      }
      listing_favorites: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_favorites_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          listing_id: string
          position: number
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          listing_id: string
          position?: number
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          listing_id?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "listing_images_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          category: string
          condition: string
          created_at: string
          currency: string
          description: string
          id: string
          is_featured: boolean
          location: string
          phone: string
          price: number
          title: string
          updated_at: string
          user_id: string
          views: number
        }
        Insert: {
          category: string
          condition?: string
          created_at?: string
          currency?: string
          description: string
          id?: string
          is_featured?: boolean
          location: string
          phone: string
          price: number
          title: string
          updated_at?: string
          user_id: string
          views?: number
        }
        Update: {
          category?: string
          condition?: string
          created_at?: string
          currency?: string
          description?: string
          id?: string
          is_featured?: boolean
          location?: string
          phone?: string
          price?: number
          title?: string
          updated_at?: string
          user_id?: string
          views?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          level: string | null
          points: number | null
          streak_days: number | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          level?: string | null
          points?: number | null
          streak_days?: number | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          level?: string | null
          points?: number | null
          streak_days?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      reel_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_id: string | null
          reel_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          reel_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          reel_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reel_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "reel_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reel_comments_reel_id_fkey"
            columns: ["reel_id"]
            isOneToOne: false
            referencedRelation: "reels"
            referencedColumns: ["id"]
          },
        ]
      }
      reel_likes: {
        Row: {
          created_at: string
          id: string
          reel_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reel_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reel_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reel_likes_reel_id_fkey"
            columns: ["reel_id"]
            isOneToOne: false
            referencedRelation: "reels"
            referencedColumns: ["id"]
          },
        ]
      }
      reels: {
        Row: {
          audio_name: string | null
          comments_count: number
          created_at: string
          description: string | null
          id: string
          likes_count: number
          shares_count: number
          thumbnail_url: string | null
          title: string
          updated_at: string
          user_id: string
          video_url: string
          views_count: number
        }
        Insert: {
          audio_name?: string | null
          comments_count?: number
          created_at?: string
          description?: string | null
          id?: string
          likes_count?: number
          shares_count?: number
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          user_id: string
          video_url: string
          views_count?: number
        }
        Update: {
          audio_name?: string | null
          comments_count?: number
          created_at?: string
          description?: string | null
          id?: string
          likes_count?: number
          shares_count?: number
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          video_url?: string
          views_count?: number
        }
        Relationships: []
      }
      user_activity_stats: {
        Row: {
          apps_saved: number | null
          audio_listened: number | null
          books_read: number | null
          content_uploaded: number | null
          created_at: string | null
          id: string
          reels_watched: number | null
          total_likes: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          apps_saved?: number | null
          audio_listened?: number | null
          books_read?: number | null
          content_uploaded?: number | null
          created_at?: string | null
          id?: string
          reels_watched?: number | null
          total_likes?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          apps_saved?: number | null
          audio_listened?: number | null
          books_read?: number | null
          content_uploaded?: number | null
          created_at?: string | null
          id?: string
          reels_watched?: number | null
          total_likes?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_apps: {
        Row: {
          category: string
          created_at: string
          description: string
          icon_url: string | null
          id: string
          link: string | null
          name: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          icon_url?: string | null
          id?: string
          link?: string | null
          name: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon_url?: string | null
          id?: string
          link?: string | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      user_audio: {
        Row: {
          artist: string
          audio_url: string | null
          category: string
          cover_url: string | null
          created_at: string
          description: string
          duration: string | null
          id: string
          title: string
          user_id: string
        }
        Insert: {
          artist?: string
          audio_url?: string | null
          category?: string
          cover_url?: string | null
          created_at?: string
          description?: string
          duration?: string | null
          id?: string
          title: string
          user_id: string
        }
        Update: {
          artist?: string
          audio_url?: string | null
          category?: string
          cover_url?: string | null
          created_at?: string
          description?: string
          duration?: string | null
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_name: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_name: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_name?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_books: {
        Row: {
          author: string
          category: string
          cover_url: string | null
          created_at: string
          description: string
          file_url: string | null
          id: string
          pages: number | null
          title: string
          user_id: string
        }
        Insert: {
          author: string
          category?: string
          cover_url?: string | null
          created_at?: string
          description?: string
          file_url?: string | null
          id?: string
          pages?: number | null
          title: string
          user_id: string
        }
        Update: {
          author?: string
          category?: string
          cover_url?: string | null
          created_at?: string
          description?: string
          file_url?: string | null
          id?: string
          pages?: number | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          language: string
          notifications_enabled: boolean
          theme: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          language?: string
          notifications_enabled?: boolean
          theme?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          language?: string
          notifications_enabled?: boolean
          theme?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
