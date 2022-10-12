Sentry.init do |config|
  config.dsn = ENV["SENTRY_DSN"]
  config.breadcrumbs_logger = [:active_support_logger, :http_logger]

  # Set tracesSampleRate to 0.0 to capture 0%
  # of transactions for performance monitoring.
  config.traces_sample_rate = 0.0
end
