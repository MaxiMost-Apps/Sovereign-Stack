export interface GarnishLockState {
    isLocked: boolean; // Determines if UI interaction is blocked
    blurIntensity: 'none' | 'standard' | 'deep'; // none=0px, standard=4px, deep=8px
    lockReason?: 'initializing' | 'data_sync' | 'security_hold' | 'manual_override';
    targetComponent?: string; // Metadata for the specific route being guarded
}
