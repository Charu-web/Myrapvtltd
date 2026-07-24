import ToggleSwitch from './ToggleSwitch'

export default function PermissionsSection({ permissions, onToggle }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue text-xs font-semibold text-white">
          C
        </span>
        <h3 className="text-sm font-semibold text-gray-800">Permissions &amp; Access</h3>
      </div>

      <div className="space-y-1 rounded-lg border border-gray-100">
        {permissions.map((perm, i) => (
          <div
            key={perm.key}
            className={`flex items-center justify-between gap-4 px-4 py-3 ${
              i !== permissions.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div>
              <p className="text-sm font-medium text-gray-700">{perm.label}</p>
              <p className="text-xs text-gray-400">{perm.description}</p>
            </div>
            <ToggleSwitch
              checked={perm.enabled}
              onChange={() => onToggle(perm.key)}
              label={perm.label}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
